<?php
namespace app\models;
use Yii;
use yii\filters\RateLimitInterface;
use yii\helpers\Json;
use yii\helpers\Url;
use yii\swiftmailer\Mailer;
/**
 * This is the model class for table "user".
 *
 * @property int $id
 * @property string $username
 * @property string $password
 * @property string $salt
 * @property string $accessToken
 * @property string $authKey
 * @property string $created_at
 * @property bool $confirm
 */
class User extends \yii\db\ActiveRecord implements \yii\web\IdentityInterface
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%tbl_users}}';
    }
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['username', 'password'], 'required'],
            [['created_at'], 'safe'],
            [['confirm'], 'boolean'],
            [['username', 'password', 'salt', 'accessToken'], 'string', 'max' => 255],
            [['username'], 'unique'],
            [['accessToken'], 'unique'],
            [['username'], 'email'],
            [['username', 'accessToken'], 'unique'],
        ];
    }
    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'username' => Yii::t('app', 'User Name'),
            'password' => Yii::t('app', 'Your password'),
            'salt' => 'Salt',
            'accessToken' => 'Access Token',
            'created_at' => Yii::t('app', 'Date Create'),
            'confirm' => 'Confirm Registration Status',
        ];
    }
    /**
     * Before save event handler
     * @param bool $insert
     * @return bool
     */
    public function beforeSave($insert)
    {
        if (parent::beforeSave($insert)) {
            if($this->isAttributeChanged('confirm')){
                return true;
            }
            if ($this->getIsNewRecord() && !empty($this->password)) {
                $this->salt = $this->saltGenerator();
            }
            if (!empty($this->password)) {
//                var_dump($this->password, $this->salt, md5($this->password . $this->salt));
                $this->password = $this->passWithSalt($this->password, $this->salt);
            } else {
                unset($this->password);
            }
            return true;
        } else {
            return false;
        }
    }
    /**
     * Generate the salt
     * @return string
     */
    public function saltGenerator()
    {
        return md5($this->username);
    }
    /**
     * Return pass with the salt
     * @param $password
     * @param $salt
     * @return string
     */
    public function passWithSalt($password, $salt)
    {
        return md5($password . $salt);
    }
    /**
     * @inheritdoc
     */
    public static function findIdentity($id)
    {
        return static::findOne(['id' => $id]);
    }
    /**
     * @inheritdoc
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        return static::findOne(['accessToken' => $token]);
    }
    /**
     * Finds user by username
     *
     * @param string $username
     * @return static|null
     */
    public static function findByUsername($username)
    {
        return static::findOne(['username' => $username]);
    }
    /**
     * @inheritdoc
     */
    public function getId()
    {
        return $this->id;
    }
    /**
     * @inheritdoc
     */
    public function getAuthKey()
    {
        return $this->accessToken;
    }
    /**
     * @inheritdoc
     */
    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }
    /**
     * Validates password
     *
     * @param  string $password password to validate
     * @return boolean if password provided is valid for current user
     */
    public function validatePassword($password)
    {
//        var_dump($this->passWithSalt($password, $this->salt));
        return $this->password === $this->passWithSalt($password, $this->salt);
    }
    /**
     * Generates password hash from password and sets it to the model
     *
     * @param string $password
     */
    public function setPassword($password)
    {
        $this->password = $this->passWithSalt($password, $this->saltGenerator());
    }
    /**
     * Generates "remember me" authentication key
     */
    public function generateAuthKey()
    {
        try {
            $this->accessToken = Yii::$app->security->generateRandomString();
        } catch (\Exception $exception) {
            Yii::warning($exception . Yii::t('app', "Mistake"));
        }
    }
}