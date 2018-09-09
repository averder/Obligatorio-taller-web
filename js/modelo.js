
    $(document).ready(function (){
         $('.fecha').keyup(function (){
           this.value = (this.value + '').replace(/[^0-9]/g, '');
		 });
		 $(":text").each(function(){	
					$($(this)).val('');
				});
		 borrarImg();
		 inicio();
    });

	var todosFuncionarios = [];
	var todosConceptos = [];
	var lineasLiquidacion = [];
		
function inicio(){
	//mouse over
	$("#btnFuncionario").mouseover(imagenBoton);
	$("#btnConcepto").mouseover(imagenBoton);
	$("#btnLiquidacion").mouseover(imagenBoton);
	$("#btnSueldos").mouseover(imagenBoton);
	$("#btnDinero").mouseover(imagenBoton);
	
	//mouse out
	$("#btnFuncionario").mouseout(imagenBoton);
	$("#btnConcepto").mouseout(imagenBoton);
	$("#btnLiquidacion").mouseout(imagenBoton);
	$("#btnSueldos").mouseout(imagenBoton);
	$("#btnDinero").mouseout(imagenBoton);
	
	//cambiar de opcion al presionar clic
	$("#btnFuncionario").click(function(){
		$(".esconder").hide();
		$("#altaFuncionario").show('slow');
		opcionUno();
		 $(":text").each(function(){	
					$($(this)).val('');
				});
		 borrarImg();
	});
	$("#btnConcepto").click(function(){
		$(".esconder").hide();
		$("#registrarConcepto").show('slow');
		opcionDos();
		 $(":text").each(function(){	
					$($(this)).val('');
				});
		 borrarImg();
	});
	$("#btnLiquidacion").click(function(){
		$(".esconder").hide();
		$("#lineaLiquidacion").show('slow');
		$("#txtFun").find('option').remove();
		$("#txtConcep").find('option').remove();
		cargarCombo();
	});
	$("#btnSueldos").click(function(){
		$(".esconder").hide();
		$("#consultaSueldos").show('slow');
		$("#txtListFun").find('option').remove();
		borrarImg();
	});
	$("#btnDinero").click(function(){
		$(".esconder").hide();
		$("#consultaDinero").show('slow');
		borrarImg();
	});
	
	$("#btnAlta").click(alta);
	
	$("#btnRegConcepto").click(regConcepto);	
	
	$("#btnLiquid").click(altaLiquidacion);
	
	$("#txtSeccion").click(filtrarFuncionarios);
	
	$("#txtListFun").click(function(){
		var descripcion = "";
		var funcionario = getFunctionario($("#txtListFun").val());
		$("#imagenFun").attr("src","img/"+funcionario["Numero"]+".jpg");
		$("#imagenFun").attr("onerror", "this.src='img/avatarRandom.jpg'");
		for(var i=0;i<lineasLiquidacion.length;i++){
			if(lineasLiquidacion[i][0] == funcionario){
				descripcion += (lineasLiquidacion[i][1]["Nombre"]+" Importe: "+lineasLiquidacion[i][2]+ "\n");
			}	
		}
		$("#txtAreaDescripcion").val(descripcion);	
	});
	$("#txtSeccionDin").click(function(){
		var arrayTotal = new Array(0,0,0,0,0,0,0,0,0,0,0);
		var arrayCant = [];
		var seccion = $("#txtSeccionDin").val();
		var tabla ="";
		for(var i=0; i<todosFuncionarios.length;i++){
			if(todosFuncionarios[i]["Seccion"] == seccion){
				var sobra = todosFuncionarios[i]["Sueldo"];
				arrayCant.push(dinero(sobra,2000));
				arrayTotal[0] += dinero(sobra,2000);
				sobra = sobrante(sobra,2000);
				arrayCant.push(dinero(sobra,1000));
				arrayTotal[1] += dinero(sobra,1000);
				sobra = sobrante(sobra,1000);
				arrayCant.push(dinero(sobra,500));
				arrayTotal[2] += dinero(sobra,500);
				sobra = sobrante(sobra,500);
				arrayCant.push(dinero(sobra,200));
				arrayTotal[3] += dinero(sobra,200);
				sobra = sobrante(sobra,200);
				arrayCant.push(dinero(sobra,100));
				arrayTotal[4] += dinero(sobra,100);
				sobra = sobrante(sobra,100);
				arrayCant.push(dinero(sobra,50));
				arrayTotal[5] += dinero(sobra,50);
				sobra = sobrante(sobra,50);
				arrayCant.push(dinero(sobra,20));
				arrayTotal[6] += dinero(sobra,20);
				sobra = sobrante(sobra,20);
				arrayCant.push(dinero(sobra,10));
				arrayTotal[7] += dinero(sobra,10);
				sobra = sobrante(sobra,10);
				arrayCant.push(dinero(sobra,5));
				arrayTotal[8] += dinero(sobra,5);
				sobra = sobrante(sobra,5);
				arrayCant.push(dinero(sobra,2));
				arrayTotal[9] += dinero(sobra,2);
				sobra = sobrante(sobra,2);
				arrayCant.push(dinero(sobra,1));
				arrayTotal[10] += dinero(sobra,1);				
			tabla += '<tr><td>'+todosFuncionarios[i]["Numero"]+'</td><td>'+arrayCant[0]+
			'</td><td>'+arrayCant[1]+'</td><td>'+arrayCant[2]+'</td><td>'+arrayCant[3]+
			'</td><td>'+arrayCant[4]+'</td><td>'+arrayCant[5]+'</td><td>'+arrayCant[6]+
			'</td><td>'+arrayCant[7]+'</td><td>'+arrayCant[8]+'</td><td>'+arrayCant[9]+
			'</td><td>'+arrayCant[10]+'</tr>';
			arrayCant = [];
			}
	
		}
		
		var finalTab = '<tr><td>TOTAL:</td><td>'+arrayTotal[0]+
			'</td><td>'+arrayTotal[1]+'</td><td>'+arrayTotal[2]+'</td><td>'+arrayTotal[3]+
			'</td><td>'+arrayTotal[4]+'</td><td>'+arrayTotal[5]+'</td><td>'+arrayTotal[6]+
			'</td><td>'+arrayTotal[7]+'</td><td>'+arrayTotal[8]+'</td><td>'+arrayTotal[9]+
			'</td><td>'+arrayTotal[10]+'</tr>';
			
		$("#tablistado").html( '<h3>Consulta de dinero</h3>' + '<table id="tblMostrar"><tr><th>Número funcionario</th><th>$2000</th><th>$1000</th>'+
		'<th>$500</th><th>$200</th><th>$100</th><th>$50</th><th>$20</th><th>$10</th><th>$5</th><th>$2</th><th>$1</th></tr>' + tabla + finalTab);		
	});
	
}

function imagenBoton(){
	var idBoton = $(this).attr("id");
	var srcActual = $(this).attr("src");
	if(srcActual.contains("Original")){
		$(this).attr("src","img/"+idBoton+"OnMouse.png");		
	}
	else{
		$(this).attr("src","img/"+idBoton+"Original.png");
	}
}

//validar Palabra
function validarPalabra(){
	var palabra = $(this).val();
	var idActual = $(this).attr("id");
	var idError;
	var idImg ;
		if(idActual.contains("txtNombre")){	
			idError = "#errNombre";
			idImg = "'valNombre'";
		}
		else if (idActual.contains("txtApellido")){
			idError = "#errApellido";
			idImg = "'valApellido'";
		}
		else{
			idError = "#errDireccion";
			idImg = "'valDireccion'";
		}
		if(palabra.length>0){
			$(idError).html("<img id ="+idImg+"src='img/ok.png' height = '15px' width = '15px'>" );
		}
		else{
			$(idError).html("<img id ="+idImg+" src='img/error.png' height = '15px' width = '15px'> Ingresar un texto no vacío");
		}
}

//validar dia
function validarDia(){
	var respuesta = "nose";
	var numero = $("#txtDia").val();
	if(numero !=""){
		if(numero>0 && numero<32){
			respuesta = "ok";
			if($("#valFecha").attr("alt") == "dia"){
				$("#errFecha").empty();
			}
		}
		else{
			$("#errFecha").html("<img id ='valFecha'  alt='dia' src='img/error.png' height = '15px' width = '15px'>  Ingresar un día entre 1 y 31 " );
		}
	}
	else{
		$("#errFecha").html("<img id ='valFecha'  alt='dia' src='img/error.png' height = '15px' width = '15px'>  Ingresar un número en día " );
	}
	return respuesta;
}

// validar mes
function validarMes(){
	var respuesta = "nose";
	var numero = $("#txtMes").val();
	if(numero !=""){
		if(numero>0 && numero<13){
			respuesta = "ok";
			if($("#valFecha").attr("alt") == "mes"){
				$("#errFecha").empty();
			}
		}
		else{
			$("#errFecha").html("<img id ='valFecha'  alt='mes' src='img/error.png' height = '15px' width = '15px'>  Ingresar un mes entre 1 y 12 " );
		}
	}
	else{
		$("#errFecha").html("<img id ='valFecha'  alt='mes' src='img/error.png' height = '15px' width = '15px'>  Ingresar un número en mes " );
	}
	return respuesta;
}

//validar año
function validarAño(){
	var respuesta = "nose";
	var numero = $("#txtAnio").val();
	if(numero != ""){
		if(numero>=1980){
			respuesta = "ok";
			if($("#valFecha").attr("alt") == "año"){
				$("#errFecha").empty();
			}
		}
		else{
			$("#errFecha").html("<img id ='valFecha' alt='año' src='img/error.png' height = '15px' width = '15px'> Ingresar un año mayor a 1979" );
		}
	}
	else{
		$("#errFecha").html("<img id ='valFecha' alt='año' src='img/error.png' height = '15px' width = '15px'> Ingresar un número en año de ingreso" );
	}
	return respuesta;
}

function validarFecha(respUno, respDos ,respTres){
	if(respUno == "ok"  && respDos == "ok" && respTres == "ok"){
		$(errFecha).html("<img id ='valFecha' src='img/ok.png' height = '15px' width = '15px'>" );
	}
}

//validar numero unico
function validarNum(){
	var fun;
	var dato = $("#txtNumero").val();
	var ok = true;
	
	if(dato == ""){
		$(errNumero).html("<img id ='valNum' src='img/error.png' height = '15px' width = '15px'> Ingresar un número único");
	}
	else{
		if(todosFuncionarios.length !=0){
			for(var i = 0 ; i<todosFuncionarios.length && ok; i++){
				fun = todosFuncionarios[i]["Numero"];
				if(fun == dato){
					$(errNumero).html("<img id ='valNum' src='img/error.png' height = '15px' width = '15px'> El número ingresado ya existe ");	
					ok = false;
				}		
			}
			if(ok){
				$(errNumero).html("<img id ='valNum' src='img/ok.png' height = '15px' width = '15px'>  ");	
			}	
		}
		else{
			$(errNumero).html("<img id ='valNum' src='img/ok.png' height = '15px' width = '15px'> ");
		}
	}
}

//validar nombre unico
function validarNombre(){
	var dato = $("#txtNomConcepto").val();
	var ok = true;
	var concepto;
	
	if(dato == ""){
		$(errConceptoUno).html("<img id ='valConcepto' src='img/error.png' height = '15px' width = '15px'> Ingresar un nombre único");
	}
	else{
		if(todosConceptos.length !=0){
			for(var i = 0 ; i<todosConceptos.length && ok; i++){
				concepto = todosConceptos[i]["Nombre"];
				if(concepto == dato){
					$(errConceptoUno).html("<img id ='valConcepto' src='img/error.png' height = '15px' width = '15px'> El nombre ingresado ya existe ");	
					ok = false;
				}		
			}
			if(ok){
				$(errConceptoUno).html("<img id ='valConcepto' src='img/ok.png' height = '15px' width = '15px'>  ");	
			}	
		}
		else{
			$(errConceptoUno).html("<img id ='valConcepto' src='img/ok.png' height = '15px' width = '15px'> ");
		}
	}	
}

//validar Formulario
function validarFormulario(){	
	var srcNum = $("#valNum").attr("src");
	var srcNom = $("#valNombre").attr("src");
	var srcApe = $("#valApellido").attr("src");
	var srcDire = $("#valDireccion").attr("src");	
	var srcSelec = $("#valSeleccion").attr("src");	
	var srcFecha = $("#valFecha").attr("src");	

	return (srcNum.contains("ok") && srcNom.contains("ok") && srcApe.contains("ok") && 
	srcDire.contains("ok") && srcSelec.contains("ok") && srcFecha.contains("ok"));			 	
}

//borrar imagen 
function borrarImg(){
	$(errNumero).empty();
	$(errNombre).empty();
	$(errApellido).empty();
	$(errDireccion).empty();
	$(errSeleccion).empty();
	$(errFecha).empty();
	$(errConceptoUno).empty();
	$(errConceptoDos).empty();
	$("#imgFun").attr("src","img/avatarRandom.jpg");
	$("#imagenFun").attr("src","img/avatarRandom.jpg");
	$("#txtAreaDescripcion").val("");
	$("#tablistado").empty();
}
	
function alta(){
		$( "#txtNumero" ).trigger( "blur" );
		$( "#txtNombre" ).trigger( "blur" );
		$( "#txtApellido" ).trigger( "blur" );
		$( "#txtDireccion" ).trigger( "blur" );
		$( "#txtSeleccion" ).trigger( "blur" );
		$( "#txtDia" ).trigger( "blur" );
		$( "#txtMes" ).trigger( "blur" );
		$( "#txtAnio" ).trigger( "blur" );
			
		var validado = validarFormulario();
			if(validado){
				var funcionario = {
					Numero: $("#txtNumero").val(),
					Nombre: $("#txtNombre").val(),
					Apellido: $("#txtApellido").val(),
					Direccion: $("#txtDireccion").val(),
					Seccion: $("#txtSeleccion").val(),
					Dia: $("#txtDia").val(),
					Mes: $("#txtMes").val(),
					Año: $("#txtAnio").val(),
					Sueldo: 0
				};				
					$("#imgFun").attr("src","img/"+$("#txtNumero").val()+".jpg");
					$("#imgFun").attr("onerror", "this.src='img/avatarRandom.jpg'");
				
				todosFuncionarios.push(funcionario);
				alert("Se ha dado de alta satisfactoriamente");
				
				$(":text").each(function(){	
					$($(this)).val('');
				});
				borrarImg();
				
			}	
			if(!validado){			
				alert("Debes ingresar correctamente los campos antes de dar de alta");
			}
}		

function regConcepto(){
	$( "#txtNomConcepto" ).trigger( "blur" );	
	if($("input[name=dinero]:checked").val() == "Entrada"){
		$( "#radioUno" ).trigger( "click" );
	}
	else{
			$( "#radioDos" ).trigger( "click" );
	}
	if(validarConcepto()){
		concepto = {
			Nombre: $("#txtNomConcepto").val(),
			Dinero: $("input[name=dinero]:checked").val()
		};
		todosConceptos.push(concepto);
		alert("Se ha registrado concepto satisfactoriamente");
		$(":text").each(function(){	
			$($(this)).val('');
		});
		borrarImg();
	}
	else{
		alert("Debes ingresar correctamente los campos antes de registrar concepto");
	}
}

function validarConcepto(){
	var srcNom = $("#valConcepto").attr("src");
	var srcDinero = $("#valRadio").attr("src");	
	return (srcDinero.contains("ok") && srcNom.contains("ok"));			 	
}

function cargarCombo(){	
	for(var i=0; i<todosFuncionarios.length;i++){ 
		var fun = todosFuncionarios[i];
		$("#txtFun").append("<option value ='"+ fun["Numero"] +"'>"+ " Nro: "+ fun["Numero"]+"</option>"); 
	}
	for(var i=0; i<todosConceptos.length;i++){
		var concepto = todosConceptos[i];
		$("#txtConcep").append("<option value ='"+concepto["Nombre"]+"'>"+" Nombre: " +concepto["Nombre"] +" Dinero: "+ concepto["Dinero"] +"</option>"); 
	}	
}

function opcionUno(){
	var respuestaUno=""; 
	var respuestaDos="";
	var respuestaTres="";
	
	$("#txtNumero").blur(function(){
		$("#imgFun").attr("src","img/"+$("#txtNumero").val()+".jpg");
		$("#imgFun").attr("onerror", "this.src='img/avatarRandom.jpg'");
		validarNum(todosFuncionarios);
	});
	$("#txtNombre").blur(validarPalabra);
	$("#txtApellido").blur(validarPalabra);
	$("#txtDireccion").blur(validarPalabra); 
	$("#txtSeleccion").blur(function(){
		$(errSeleccion).html("<img id ='valSeleccion' src='img/ok.png' height = '15px' width = '15px'>" );
	});
	$("#txtDia").blur(function(){
		respuestaUno=validarDia();
		validarFecha(respuestaUno,respuestaDos,respuestaTres);
	});
	$("#txtMes").blur(function(){
		respuestaDos = validarMes();
		validarFecha(respuestaUno,respuestaDos,respuestaTres);
	});
	$("#txtAnio").blur(function(){
		respuestaTres = validarAño();
		validarFecha(respuestaUno,respuestaDos,respuestaTres);
	});
}

function opcionDos(){

	$("#txtNomConcepto").blur(function(){
		validarNombre();
	});
	$("#radioUno").click(function(){
		$(errConceptoDos).html("<img id ='valRadio' src='img/ok.png' height = '15px' width = '15px'>" );
	});
	$("#radioDos").click(function(){
		$(errConceptoDos).html("<img id ='valRadio' src='img/ok.png' height = '15px' width = '15px'>" );
	});
}

function altaLiquidacion(){
	var funcionario = getFunctionario($("#txtFun").val());
	var concepto = getConcepto($("#txtConcep").val());
	var importe = parseInt($("#txtImporte").val());
	
	var ok = false;
	var modificar = false;
	var sueldoLiquido = 0;
	var posModificar = 0;
	
	for(var i=0; i<lineasLiquidacion.length;i++){
		if(lineasLiquidacion[i][0] == funcionario && lineasLiquidacion[i][1] != concepto){
			sueldoLiquido += lineasLiquidacion[i][2];	
		}
		else if(lineasLiquidacion[i][0] == funcionario && lineasLiquidacion[i][1] == concepto){			
			modificar = true;
			posModificar = i;
		}
	}
	if(concepto["Dinero"] == "Salida"){
				importe = -1 * importe;
	}
	sueldoLiquido += importe;
	if(sueldoLiquido>=0){
		funcionario["Sueldo"] = sueldoLiquido;
		if(!modificar){
			linea = [funcionario,concepto,importe];
			lineasLiquidacion.push(linea);
		}
		else{
			lineasLiquidacion[posModificar][2] = importe;
		}
		alert("Se ha ingresado correctamente la línea de liquidación");
	}
	else{
		alert("No se pudo ingresar línea liquidación ");
	}
}

function getFunctionario(num){
	var funcionario;
	for(var i =0; i< todosFuncionarios.length;i++){
		if(todosFuncionarios[i]["Numero"] == num){
			funcionario = todosFuncionarios[i];
		}
	}
	return funcionario;
}

function getConcepto(palabra){
	var concepto;
	for(var i =0; i< todosConceptos.length;i++){
		if(todosConceptos[i]["Nombre"] == palabra){
			concepto = todosConceptos[i];
		}
	}
	return concepto;
}

function filtrarFuncionarios(){ 
	$("#txtListFun").find('option').remove();
	var arrayFiltrado = [];
	var seccion = $("#txtSeccion").val();
	for(var i=0; i<todosFuncionarios.length;i++){ 
		var fun = todosFuncionarios[i];
		if(fun["Seccion"] == seccion){
			arrayFiltrado.push(fun);
		}
	}
	arrayFiltrado.sort(compareTo);
	for(var i=0; i<arrayFiltrado.length;i++){
		$("#txtListFun").append("<option value ='"+arrayFiltrado[i]["Numero"]+"'>"+" Nombre: "+ arrayFiltrado[i]["Nombre"] +" Sueldo: "+ arrayFiltrado[i]["Sueldo"]+"</option>"); 
	}
}

function compareTo(funA,funB) {
  if (funA["Nombre"] < funB["Nombre"])
     return -1;
 if (funA["Nombre"] > funB["Nombre"])
    return 1;
	return 0;
}

function dinero(sueldo,num){
	var cantidad = Math.floor(sueldo/num);
	return cantidad;
}

function sobrante(sueldo,num){
	var cantidad = Math.floor(sueldo/num);
	var sob = sueldo - (num * cantidad);
	return sob;
}

