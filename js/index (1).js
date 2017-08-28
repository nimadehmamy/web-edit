/* Nima Dehmamy 2017
    nidami@gmail.com
*/

`<li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>`;
                    

function addtoNav(name){
    var name0 = name.replace(' ','');
    var node = document.createElement("LI");
    node.setAttribute('class', 'nav-item');
    node.innerHTML = '<a class="nav-link" id="a'+name0 + '" href="#0' + name0 + '" onclick="showClass(' + "'" + name0 + "'" + ')">' + name + '</a>';
    $('.mr-auto').append(node);
}

function makePageDiv(name){
    var name0 = name.replace(' ','');
    $('#contents')[0].innerHTML += "<div id='"+name0+"' class='" + name0 + " page' style='display:none' onclick='editThis()'><h2>" + name + "</h2></div>\n";
    activeToggle();

    var Data = $.get("contents/" + name0 + ".html",
        function(data) {
            console.log(data);
            // $('#' + name).html(data);
            $('.'+name0+'.page').html(data);
            // console.log($('.'+name0+'.page').html());
        });
    mJax(name0)
    // MathJax.Hub.Queue(["Typeset", MathJax.Hub, name0]);
}

function makePage3(name){
    addtoNav(name);
    makePageDiv(name);
}

function activeToggle() {
    $("li.nav-item").click(function() {
        // remove classes from all
        $("li.nav-item").removeClass("active");
        // add class to the one we clicked
        $(this).addClass("active");
        // update Download bottom
        $('#dlPage').html($(this).text());
    });
}

function editThis() {
    $('.page').click(function(){
        $('.page').removeClass('edit');
        $(this).addClass('edit');
    });
    
}


function updateContents() {
    var a = $('.edit');
    a.html(tinyMCE.activeEditor.getContent());
    mJax(a[0]);
}
function updateContents0() {
    var a = $('li.nav-item.active');
    var at = a.text();
    $('.'+at+'.page').html(tinyMCE.activeEditor.getContent());
    mJax(at);
}

function mJax(elem){
    try{
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, $('#'+elem)[0] ]);
    }catch(err){
        console.log("MathJax issue: ", err.message);
    }
}

$(activeToggle);

console.log('elements generated');

/* Show page and edit each section
showPage(el) should hide all .page and show el (can be a class!)
All .page should have an onclick function that lods their content to the editor and
adds an .edit class so the editor knows which one it's updating.
*/

function showPage(el){
    var p = $('.page');
    p.addClass('d-none'); // to hide all pages
    // make this page visible
    v = $(el);
    v.removeClass('d-none');
    v.addClass('active');
    // put the page contents into the editor
    tinyMCE.activeEditor.setContent(v.innerHTML);
}

function show(elem){
    var p = $('.page');
    p.addClass('d-none'); // to hide all pages
    // make this page visible
    v = $('#'+elem);
    v.removeClass('d-none');
    v.addClass('active');
    // put the page contents into the editor
    tinyMCE.activeEditor.setContent(v.innerHTML);
}
function showClass(cl){
    // var p = $('#contents').children();
    // for(var i = 0; i < p.length; i++){
    //     // hide other pages
    //     p[i].style.display = 'none';
    // }
    var p = $('.page');
    for (var i in p){
        try{ p[i].style.display = 'none'; }
        catch(TypeError){}
    }
    // make this page visible
    var v = $('.'+cl);
    //console.log(v);
    for (var i in v){
        try{ v[i].style.display = 'block'; }
        catch(TypeError){}
    }
    // put the page contents into the editor
    tinyMCE.activeEditor.setContent($('.'+cl+'.page')[0].innerHTML);//(v.innerHTML);
}



function show0(elem){
    var p = $('#contents').children();
    for(var i = 0; i < p.length; i++){
        // hide other pages
        p[i].style.display = 'none';
    }
    // make this page visible
    v = $('#'+elem)[0];
    v.style.display = 'block';
    // put the page contents into the editor
    tinyMCE.activeEditor.setContent(v.innerHTML);
}

function showClass0(cl){
    // var p = $('#contents').children();
    // for(var i = 0; i < p.length; i++){
    //     // hide other pages
    //     p[i].style.display = 'none';
    // }
    var p = $('.page');
    for (var i in p){
        try{ p[i].style.display = 'none'; }
        catch(TypeError){}
    }
    // make this page visible
    var v = $('.'+cl);
    //console.log(v);
    for (var i in v){
        try{ v[i].style.display = 'block'; }
        catch(TypeError){}
    }
    // put the page contents into the editor
    tinyMCE.activeEditor.setContent($('.'+cl+'.page.post')[0].innerHTML);//(v.innerHTML);
}

function toggleEdit(){
    var e = $('#editor')[0];
    if (e.style.display == 'block'){
        e.style.display = 'none';
        $('#edit').text('Show Editor');
    }else{
        $('#edit').text('Hide Editor');
        e.style.display = 'block';
    }
    
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function dl() {
    var content = $('#main')[0].innerHTML;
    var page = $('.activeP')[0].innerHTML;
    console.log(page);
    var filename = page+'.html'
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function dlActive() {
    var page = $('.activeP').text();
    var content = '';
    var pg = $('.'+page);
    for (var i=0; i < pg.length; i++){
        content += pg[i].innerHTML;
        console.log(pg[i].innerHTML);
    }
    
    var filename = page + '.html'
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}


function makePage(name){
    name0 = name.replace(' ','');
    var node = document.createElement("LI");
    node.innerHTML = '<a id="a'+name0 + '" href="#0' + name0 + '" onclick="show(' + "'" + name0 + "'" + ')">' + name + '</a>';
    $('.topnav').append(node);
    dv = document.createElement("DIV");
    dv.setAttribute('id','0'+name0 );
    $('body').append(dv);
    
    $('#contents')[0].innerHTML += "<div id='" + name0 + "' class='post' style='display:none'><h2>" + name + "</h2></div>\n";
    activeToggle();

    var Data = $.get("contents/" + name0 + ".html",
        function(data) {
            console.log(data);
            $('#' + name).html(data);
        });
    
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, name0]);
}


function makePage2(name){
    var name0 = name.replace(' ','');
    var node = document.createElement("LI");
    node.innerHTML = '<a id="a'+name0 + '" href="#0' + name0 + '" onclick="showClass(' + "'" + name0 + "'" + ')">' + name + '</a>';
    $('.topnav').append(node);
    // dv = document.createElement("DIV");
    // dv.setAttribute('id','0'+name0 );
    // $('body').append(dv);
    
    $('#contents')[0].innerHTML += "<div id='"+name0+"' class='" + name0 + " page post' style='display:none'><h2>" + name + "</h2></div>\n";
    activeToggle();

    var Data = $.get("contents/" + name0 + ".html",
        function(data) {
            console.log(data);
            //$('#' + name).html(data);
            $('.'+name0+'.page.post').html(data);
        });
    
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, name0]);
}


function makeCarousel0(name, idWhere){
    var node = document.createElement("OL");
    node.setAttribute('class',"carousel-indicators" );
    $('#'+idWhere).append(node);
    var node = document.createElement("DIV");
    node.setAttribute('class',"carousel-inner" );
    node.setAttribute('role',"listbox" );
    node.setAttribute('id',"car-"+name );
    $('#'+idWhere).append(node);
    carnum = 0;
}

function makeCarousel(name, idWhere){
    el = $('#'+idWhere)[0];
    el.innerHTML += `<div class="post">
          <br><div id="`+ name +`" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators"></ol>
            <div class="carousel-inner" role="listbox"></div>
            <a class="left carousel-control" href="#`+name+`" role="button" data-slide="prev">
              <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" href="#`+name+`" role="button" data-slide="next">
              <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div></div>`;
    carnum = 0;
}

function addtoCarousel(car,name,img,text,file){
    `file.html: containing page. It will populate #content`
    ol = $('#'+car+'>ol')[0];
    ol.innerHTML += `<li id="`+car+carnum+`" data-target="#`+car+`" data-slide-to="`+carnum+`" `+
    (carnum ? '':' class="active"')+`></li>`
    carin = $('#'+car+'>div')[0];
    carin.innerHTML += `<div class="item `+(carnum ? '':'active')+` slides">
                 <a onclick="console.log('`+file+`');" >
                     <img src="`+img+`">
                     <p class="btn btn-large btn-primary">`+
                     text+`</p>
                 </a>
               </div>`
    carnum +=1;
    
}

function addResearch(car,file){
    `file.html: containing page.`
    //makePageDiv(file);
    // must be done as callback. otherwise, element not ready when JQ calls
    var img = $('#'+file+'>p>img').attr('src');
    var title = $('#'+file+'>h2').text();
    //var text = $('#'+file+'>p')[1].text();
    ol = $('#'+car+'>ol')[0];
    ol.innerHTML += `<li id="`+car+carnum+`" data-target="#`+car+`" data-slide-to="`+carnum+`" `+
    (carnum ? '':' class="active"')+`></li>`
    carin = $('#'+car+'>div')[0];
    carin.innerHTML += `<div class="item `+(carnum ? '':'active')+` slides">
                 <a onclick="showClass('`+file+`');" >
                     <img src="`+img+`">
                     <p class="btn btn-large btn-primary">`+
                     title+`</p>
                 </a>
               </div>`
    carnum +=1;
    
}

function makeResearch(name){
    
    var name0 = name.replace(' ','');
    $('#contents')[0].innerHTML += "<div id='"+name0+"' class='" + name0 + " page post' style='display:none'><h2>" + name + "</h2></div>\n";
    activeToggle();

    var Data = $.get("contents/" + name0 + ".html",
        function(data) {
            console.log(data);
            //$('#' + name).html(data);
            $('.'+name0+'.page.post').html(data);
            //console.log($('.'+name0+'.page.post').html());
            addResearch('res-car',name0);
        });
    
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, name0]);
    
}

` <div class="post">
          <br>
          <div id="myCarousel" class="carousel slide" data-ride="carousel">
            <!-- Indicators -->
            <ol class="carousel-indicators">
              <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
              <li data-target="#myCarousel" data-slide-to="1"></li>
              <li data-target="#myCarousel" data-slide-to="2"></li>
              <li data-target="#myCarousel" data-slide-to="3"></li>
            </ol>
        
            <!-- Wrapper for slides -->
            <div class="carousel-inner" role="listbox">
              <div class="item active slides">
                <a onclick="console.log('hhihih');" >
                    <img src="amo-jqi.jpg">
                    <p class="btn btn-large btn-primary">AMO physics djlkjd skdjskl lksjlksf jkl</p>
                </a>
              </div>
        
              <div class="item">
                <img src="amo-jqi.jpg">
              </div>
            
              <div class="item">
                <img src="amo-jqi.jpg">
              </div>
        
              <div class="item">
                <img src="amo-jqi.jpg">
              </div>
            </div>
        
            <!-- Left and right controls -->
            <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
              <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
              <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
`