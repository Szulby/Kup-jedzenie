from flask_jwt_extended import verify_jwt_in_request
from flask_jwt_extended import set_access_cookies
from flask_jwt_extended import get_jwt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import create_access_token
from flask import jsonify, request
from flask import Flask, request
from flask_mysqldb import MySQL
import json
import mail
from datetime import datetime
from datetime import timedelta
from datetime import timezone
from flask_cors import CORS  # comment this on deployment
import os
app = Flask(__name__)

app.config['HOST'] = '0.0.0.0'
app.config['MYSQL_HOST'] = os.environ.get('MYSQL_HOST')
app.config['MYSQL_USER'] = os.environ.get('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.environ.get('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.environ.get('MYSQL_DB')

app.config['DEBUG'] = True
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]

app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=5)

app.config['SECRET_KEY'] = b'\x99\xc4\x08Q\xf4;\x85\xefp,\x88\xf8\x91\x07\xa1\xe9\xbb\xd0)K\xcfv\xe6.'

CORS(app)  # comment on deployment
mysql = MySQL(app)
jwt = JWTManager(app)


def get_json_output(query):
    row_headers = [x[0] for x in query.description]
    json_data = []
    for result in query:
        json_data.append(dict(zip(row_headers, result)))
    return json_data


@app.route('/')
def index():
    try:
        mysql.connection.cursor()
        return "mysql connected"
    except Exception as e:
        return str(e)


@app.after_request
def refresh_expiring_jwts(response):
    response.headers["Access-Control-Allow-Credentials"] = "true"
    try:
        verify_jwt_in_request()
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except:
        return response


@app.route("/category/<id>/<ofset>")
def get_products(id, ofset):
    cur = mysql.connection.cursor()
    query = """
        SELECT p.*
        FROM product2 p
        left join sub_category2 sb on sb.id = p.category_id
        left join category2 c on c.id = sb.category_id
        where p.img != '' and sb.id = {id} and p.display = 1
        order by p.own desc
        limit {ofset}, 21
    """.format(id=id, ofset=ofset)
    cur.execute(query)
    ret = get_json_output(cur)
    return json.dumps(ret)


@app.route("/popular/<ofset>")
def get_popular_products(ofset):
    def fun(i):
        return False if i in ['', '\n'] else True
    popular = """
        2 5 8 11 14 29 35 53 52 71 93 110 113 138 166 180 182 189 190 191 215 216 213 214 251 252 270 271 272 313 314 325 370 385 431 432 429 440 443 495 513 542 548 546 553
        559 560 561 573 574 579 639 769 771 772 908 994 958 959 960 1005 1008 1049 1057 1058 1065 1091 1093 1095 1096 1099 3547 3548 3549 3550 3551 3551 3554 3555 3556 3557 3558 3565 3566 3568 3567 3579 3580
        3512 3525 3606 3607 3608 1306 1394 1398 1408 1409 1407
    """.split(' ')
    filtered = filter(fun, popular)
    joined = ','.join(filtered)

    cur = mysql.connection.cursor()
    query = """
        SELECT * FROM product2 p where id in ({joined}) limit {ofset}, 21
    """.format(joined=joined, ofset=ofset)
    cur.execute(query)
    ret = get_json_output(cur)
    cur.close()
    return json.dumps(ret)


@app.route("/search/<query>/<ofset>")
def search(query, ofset):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM product2 p where p.name like %s and display = 1 order by p.own desc limit %s, 21",
                ('%' + query + '%', int(ofset)))
    ret = get_json_output(cur)
    return json.dumps(ret)


@app.route("/get_cart/<query>")
def get_cart(query):
    cur = mysql.connection.cursor()
    query = "SELECT * FROM product2 p where id in (" + \
        query + ") order by field(id, " + query + ")"
    cur.execute(query)
    ret = get_json_output(cur)
    cur.close()
    return json.dumps(ret)


@app.route('/order', methods=['POST'])
def make_order():
    cur = mysql.connection.cursor()

    # getting last order_id

    query = "SELECT order_id FROM order_product order by order_id desc limit 1"
    cur.execute(query)
    output = get_json_output(cur)
    order_id = output[0]['order_id'] + 1 if (len(output)) else 1

    # insert order_products

    products = json.loads(request.data)['data']['products']

    products_query = ''
    for item in products:
        products_query += '({order_id},{product_id},{count}),'.format(
            order_id=order_id, product_id=item['id'], count=item['count'])
    products_query = products_query[:-1]

    query = "insert into `order_product` (order_id, product_id, count) values " + \
        products_query
    cur.execute(query)
    cur.connection.commit()

    # insert order_target

    form = json.loads(request.data)['data']['form']
    query = \
        "insert into order_target (order_id, `email`,`name`,`surname`,`street`,`city`,`zipcode`,`phone`, `info`, `delivery`,`status`,`create_at`,`update_at`) \
            values ({order_id}, '{email}', '{firstname}','{lastname}', '{street}', '{city}', '{zipCode}', '{phone}', '{info}', '{delivery}', 'nowe', now(), now())".format(
            order_id=order_id, **form)
    cur.execute(query)
    cur.connection.commit()

    # send_confirmation_mail()

    products_query = ''
    for item in products:
        if not products_query:
            products_query += str(item['id'])
        else:
            products_query += ',' + str(item['id'])
    query = "select * from product2 where id in ({0}) ORDER BY FIELD(id, {0})".format(
        products_query)
    cur.execute(query)
    ret = get_json_output(cur)
    cur.close()
    for i in range(len(ret)):
        ret[i]['count'] = products[i]['count']
        ret[i]['price_total'] = products[i]['count'] * float(ret[i]['price'])
    mail.smtp_gmail(
        form['email'],
        'Potwierdzenie zamówienia - Kup Jedzenie',
        ret
    )

    return '1'


@app.route('/orders/<stat>')
@jwt_required()
def get_orders(stat):
    try:
        get_jwt_identity()
        cur = mysql.connection.cursor()
        query = "SELECT * FROM order_target ot where ot.status = '{stat}' order by ot.create_at desc".format(
            stat=stat)
        cur.execute(query)
        output = get_json_output(cur)
        return json.dumps({'data': output, 'token': True}, default=str)
    except Exception as e:
        return json.dumps({'token': False, 'message': e}, default=str)


@app.route('/order/<id>')
@jwt_required()
def get_order(id):
    try:
        get_jwt_identity()
        cur = mysql.connection.cursor()
        query = "SELECT * FROM order_target ot where ot.order_id = '{id}'".format(
            id=id)
        cur.execute(query)
        output = get_json_output(cur)
        return json.dumps({'data': output, 'token': True}, default=str)
    except Exception as e:
        return json.dumps({'token': False, 'message': e}, default=str)


@app.route('/order_products/<id>')
def get_order_products(id):
    cur = mysql.connection.cursor()
    query = "SELECT * FROM order_product op left join product2 p on (op.product_id = p.id) where op.order_id = '{id}' order by p.category_id asc".format(
        id=id)
    cur.execute(query)
    output = get_json_output(cur)
    return json.dumps(output, default=str)


@app.route('/change_status/<id>/<stat>')
@jwt_required()
def change_status(id, stat):
    try:
        get_jwt_identity()
        cur = mysql.connection.cursor()
        query = "update order_target set status = '{stat}' where order_id = {id}".format(
            stat=stat, id=id)
        cur.execute(query)
        cur.connection.commit()
        return json.dumps({'token': True}, default=str)
    except Exception as e:
        return json.dumps({'token': False, 'message': e}, default=str)


@app.route('/login', methods=['POST'])
def login():
    data = json.loads(request.data)['data']
    if data['email'] == 'test' and data['password'] == 'test123':
        user_id = 1
        try:
            encoded_jwt = create_access_token(identity=user_id)
            response = jsonify({"token": encoded_jwt})
            set_access_cookies(response, encoded_jwt, domain=None)
            return response
        except:
            return ''
    else:
        return ''


app.run(app.config.get('HOST'))
