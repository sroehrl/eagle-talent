<?php
/* Generated by neoan3-cli */

namespace Neoan3\Components;

use Neoan3\Core\Unicore;
use Neoan3\Apps\Session;

class Header extends Unicore {
    function __construct() {
        // read
        new Session();
        if(!isset($_SESSION['language'])) {
            Session::add_session(
                [
                    'language' => 'English',
                    'gender' => 'female',
                ]
            );
        }

    }

    function postHeader($obj){
        if(isset($obj['accents'])){
            $_SESSION['accents'] = $obj['accents'];
        }
        if(isset($obj['language'])){
            $_SESSION['language'] = $obj['language'];
        }
        if(isset($obj['gender'])){
            $_SESSION['gender'] = $obj['gender'];
        }
    }
    function getHeader(){
        return $_SESSION['accents'];
    }
}
