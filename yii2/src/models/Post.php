<?php

namespace app\models;

use Yii;
use yii\db\ActiveQuery;

/**
 * This is the model class for table "{{%tbl_post}}".
 *
 * @property int $id
 * @property int $author
 * @property User $creator
 * @property string|null $title
 * @property string|null $body
 * @property string|null $created_at
 */
class Post extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%tbl_post}}';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['body'], 'required'],
            [['title'], 'required'],
            [['author'], 'integer'],
            [['body'], 'string'],
            [['title'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'author' => 'Author',
            'title' => 'Title',
            'body' => 'Body',
            'created_at' => 'Created',
        ];
    }

    /**
     * @return ActiveQuery
     */
    public function getCreator(): ActiveQuery
    {
        return $this->hasOne(User::class, ['id' => 'author']);
    }

    /**
     * {@inheritdoc}
     * @return PostQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new PostQuery(get_called_class());
    }

    public function beforeSave($insert)
    {
        $result = parent::beforeSave($insert);
        if (!$this->author) {
            $this->author = \Yii::$app->user->id;
        }
        if (!$this->created_at) {
            $this->created_at = \date('Y-m-d H:i:s');
        }
        return $result;
    }
}
