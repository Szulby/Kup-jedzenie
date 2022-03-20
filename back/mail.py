from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib


def smtp_gmail(email, title, content):
    username = "kupjedzenie.garwolin@gmail.com"
    password = "Pusia324"
    smtp_server = "smtp.gmail.com:587"
    email_from = "kupjedzenie.garwolin@gmail.com"
    email_to = email
    table = ""
    total = 20
    for item in content:
        table += """
        <tr><td><img src="{img}" height="70px"/></td><td>{name}</td><td>{price} zł</td><td>{count}</td><td style="text-align:right;">{price_total} zł</td></tr>
        """.format(
            img=item['img'].strip(),
            name=item['name'].strip(),
            price=item['price'].replace('.', ',').strip(),
            count=item['count'],
            price_total="{:.2f}".format(item['price_total']).replace('.', ',')
        )
        total += float(item['price_total'])
    body = """
        <style>
            table td {{ padding: 5px;}}
        </style>
        <p style="text-align:center;font-size: 13px;">Dziękujemy za zakupy zrobione w kup jedzenie, nasz kurier skontakuję się z Państwem jak naszybciej. <br> Poniżej przesyłamy szczegóły Twojego zamówienia</p>
        <br>
        <table style="margin:auto;">
            <tr>
                <th></th>
                <th>Nazwa</th>
                <th>Cena</th>
                <th>Ilość</th>
                <th>Razem</th>
            </tr>
            {table}
            <tr>
                <td></td>
                <td></td>
                <td colspan="2">Koszt dostawy</td
                <td style="text-align:right;">20 zł</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td colspan="2">Do zapłaty w sumie</td
                <td style="text-align:right;">{total} zł</td>
            </tr>
        </table>
    """.format(table=table, total="{:.2f}".format(total).replace('.', ','))

    msg = MIMEMultipart('alternative')
    msg.set_charset('utf8')
    msg['From'] = email_from
    msg['To'] = email
    msg['Subject'] = title
    _attach = MIMEText(body, 'html', 'UTF-8')
    msg.attach(_attach)

    server = smtplib.SMTP(smtp_server)
    server.starttls()
    server.login(username, password)
    server.sendmail(email_from, email_to,  msg.as_string())
    server.quit()
