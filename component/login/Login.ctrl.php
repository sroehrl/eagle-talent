<?php
/* Generated by neoan3-cli */

namespace Neoan3\Components;

use Neoan3\Apps\Curl;
use Neoan3\Apps\Session;
use Neoan3\Core\Unicore;

class Login extends Unicore {
    function __construct() {
        new Session();
    }

    function init() {
        $this->uni('demo')
             ->includeElement('login')
             ->hook('main', 'login', ['isLoggedIn' => Session::is_logged_in()])
             ->output();
    }

    function postLogin($obj) {
        $result = Curl::post(
            'https://learntodomore.com/apps/_neoan/apps/api.app.php', [
            'c'      => 'start',
            'config' => 'concr',
            'f'      => 'login',
            'd'      => $obj
        ]
        );
        if(!$result['error']) {
            Session::login($result['user']['id']);
            Session::add_session(['user' => $result['user']]);
        }
        return $result;
    }


}
