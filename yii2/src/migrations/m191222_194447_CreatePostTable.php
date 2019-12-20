<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%post}}`.
 */
class m191222_194447_CreatePostTable extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%tbl_post}}', [
            'id' => $this->primaryKey(),
            'author' => $this->integer()->notNull(),
            'title' => $this->string(255),
            'body' => $this->text(),
            'created_at' => $this->dateTime(),
        ]);

        $this->createTable('{{%tbl_users}}', [
            'id' => $this->primaryKey(),
            'username' => $this->string(255)->notNull(),
            'password' => $this->string(255)->notNull(),
            'salt' => $this->string(255),
            'authKey' => $this->string(255),
            'accessToken' => $this->string(255),
            'confirm' => $this->boolean(),
            'created_at' => $this->dateTime(),
        ]);

        $this->createIndex(
            'idx-posts-author_id',
            '{{%tbl_post}}',
            'author'
        );

        $this->addForeignKey(
            'fk-posts-author_id',
            '{{%tbl_post}}',
            'author',
            '{{%tbl_users}}',
            'id',
            'CASCADE'
        );

        $date = new DateTime();
        $date = $date->format('Y-m-d H:m:s');

        $this->insert('{{%tbl_users}}', [
            'username' => 'admin',
            'password' => 'c0e024d9200b5705bc4804722636378a',
            'salt' => '21232f297a57a5a743894a0e4a801fc3',
            'authKey' => 'test100key',
            'accessToken' => '100-token',
            'confirm' => 1,
            'created_at' => $date
        ]);

        $this->insert('{{%tbl_users}}', [
            'username' => 'demo',
            'password' => '2b0cc721eb91928c6ccacd9d6feba85c',
            'salt' => 'fe01ce2a7fbac8fafaed7c982a04e229',
            'authKey' => 'test101key',
            'accessToken' => '101-token',
            'confirm' => 1,
            'created_at' => $date
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        // drops foreign key for table `user`
        $this->dropForeignKey(
            'idx-posts-author_id',
            '{{%tbl_post}}'
        );

        // drops index for column `author_id`
        $this->dropIndex(
            'fk-posts-author_id',
            '{{%tbl_post}}'
        );

        $this->dropTable('{{%tbl_post}}');
        $this->dropTable('{{%tbl_users}}');
    }
}
