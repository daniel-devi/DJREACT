# Generated by Django 5.1.7 on 2025-03-15 22:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0003_alter_user_username"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="username",
            field=models.CharField(
                default={"Usern73pig69"}, max_length=50, unique=True
            ),
        ),
    ]
