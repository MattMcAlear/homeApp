<?php
$array = array('var1'=>'value1', 'var2'=>'value2', 'var3'=>array('subVar1'=>'subvalue1', 'subVar2'=>'subValue2'));

while (list($var, $val) = each($array)) {
    print "$var is $val\n";
}

/*function infi_foreach($array, $type){
	if($type == 'json'){
		
	}elseif($type == 'array'){
		$return = array();
	}
	foreach($array as $key => $val){
		if(is_array($val) || is_object($val)){
			infi_foreach($val);
		}
	}
}*/

?>