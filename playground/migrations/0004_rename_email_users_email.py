# Generated by Django 4.1 on 2022-08-22 18:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("playground", "0003_users_bitcoin_users_money_alter_users_email"),
    ]

    operations = [
        migrations.RenameField(model_name="users", old_name="Email", new_name="email",),
    ]