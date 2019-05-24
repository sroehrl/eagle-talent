import neoan from '{{base}}/asset/neoanJs/neoan.js';
import '{{base}}/asset/neoanJs/directives/for.directive.js';
import '{{base}}/asset/neoanJs/directives/click.directive.js';
import '{{base}}/asset/neoanJs/directives/input.directive.js';
import '{{base}}/asset/neoanJs/directives/showHide.directive.js';
neoan.directive('test',{
    run(element, scope, value, context){
        /*this.elementIterator(element, 'h1').forEach((ele) => {
            ele.innerHTML = ele.innerHTML.toString().toUpperCase();
        });*/
    }
});
neoan.component('test-element',{
    template:`<h1 data-for="testArray"><span data-click="alertT">$i hi</span></h1><input data-bind="testValue">`,
    data:{
        testArray:[{n:1},{n:2},{n:3}],
        testValue: 'foo'
    },
    alertT(){
        alert('bu');
    },
    loaded(){
        this.rendering();
        console.log('loaded test-element');
        // setTimeout(()=>this.rendering(),300);
    },
    updated(){
        console.log('on update');
    }
});
/**/
