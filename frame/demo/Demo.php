<?php
/**
 * Created by PhpStorm.
 * User: sroehrl
 * Date: 2/4/2019
 * Time: 1:36 PM
 */

namespace Neoan3\Frame;
use Neoan3\Core\Serve;

class Demo extends Serve{
    function __construct() {
        parent::__construct();
        define('db_name','talent');
    }


    function constants(){
        return [
            'base'=>[base],
            'link'=>[
                [
                    'sizes'=>'32x32',
                    'type'=>'image/png',
                    'rel'=>'icon',
                    'href'=>'asset/neoan-favicon.png'
                ]
            ],
            'meta'=>[
                ['name'=>'viewport','content'=>'width=device-width, initial-scale=1, shrink-to-fit=no']
            ],
            'js'=>[
                ['src' => base.'/asset/neoanJs/neoan.js','type'=>'module'],
                ['src' => base.'/node_modules/jquery/dist/jquery.min.js'],
                ['src' => base.'/node_modules/bootstrap/dist/js/bootstrap.min.js'],
            ],
            'stylesheet'=>[
            ''.base.'frame/demo/demo.css',
            ''.base.'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'https://use.fontawesome.com/releases/v5.8.2/css/all.css',
            ]
        ];
    }
}
