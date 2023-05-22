function showURL() {
    var d1 = $("#make").find(":selected").attr("class");
    var d2 = $("#model").find(":selected").attr("class");
    var d3 = $("#year").find(":selected").attr("class");
    var url = ("http://www.web.com.au/" + d1 + "/" + d2 + "/" + d3);
    window.location = url;
    return true;
}

$(document).ready(function() {
var $make = $( '#make' ),
		$model = $( '#model' ),
    $options = $model.find( 'option' );
    
$make.on( 'change', function() {
	$model.html( $options.filter( '[value="' + this.value + '"]' ) );
} ).trigger( 'change' );

var $model = $( '#model' ),
		$year = $( '#year' ),
    $options = $year.find( 'option' );
    
$model.on( 'change', function() {
	$year.html( $options.filter( '[value="' + this.value + '"]' ) );
} ).trigger( 'change' );

});