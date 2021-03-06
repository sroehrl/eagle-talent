<?php
/* Generated by neoan3-cli */

namespace Neoan3\Components;

use Neoan3\Apps\Session;
use Neoan3\Core\Unicore;
use Neoan3\Frame\Demo;
use SleekDB\SleekDB;

class Videos extends Unicore {
    private $store;

    function __construct() {
        new Session();
        $this->store = SleekDB::store('video', path . '/asset/db');
    }

    function getVideos($obj) {
        return $this->store->where('language', '=', $obj['language'])
                           ->where('gender', '=', $obj['gender'])
                           ->fetch();
    }
}
