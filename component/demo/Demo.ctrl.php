<?php
namespace Neoan3\Components;
use Neoan3\Core\Unicore;

class Demo extends Unicore{
    function init(){
        $this->uni('demo')
            ->includeElement('demo')
            ->hook('main','demo')
            ->output();
    }
}
