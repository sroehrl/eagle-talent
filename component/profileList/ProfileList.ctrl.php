<?php


namespace Neoan3\Components;


use Neoan3\Core\Unicore;
use SleekDB\SleekDB;

class ProfileList extends Unicore {
    function getProfileList(){
        $voices = SleekDB::store('voice',path.'/asset/db');
        $video = SleekDB::store('video',path.'/asset/db');
        return array_merge($video->fetch(),$voices->fetch());
    }
}
