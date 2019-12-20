<?php
namespace app\commands;

use Yii;
use yii\console\Controller;

class SeedController extends Controller
{
    public function actionIndex()
    {
        $ch = curl_init('http://jsonplaceholder.typicode.com/posts');
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($ch);
        $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        $results = false;

        if (in_array($statusCode, [200, 300, 301, 302, 304, 307])) {
            $results = json_decode($result, true);
        }

        $bulkInsertArray = array();
        foreach($results as $result){
            $bulkInsertArray[]=[
                'author'=>rand(1,2),
                'title'=>$result['title'],
                'body'=>$result['body'],
                'created_at' => \date('Y-m-d H:i:s')
            ];
        }
        if(count($bulkInsertArray)>0){
            $columnNameArray=['author','title','body', 'created_at'];
            // below line insert all your record and return number of rows inserted
            $insertCount = Yii::$app->db->createCommand()
                ->batchInsert(
                    '{{%tbl_post}}', $columnNameArray, $bulkInsertArray
                )
                ->execute();
        }

    }
}
