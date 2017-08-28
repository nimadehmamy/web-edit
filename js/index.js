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
    node.innerHTML = '<a class="nav-link" id="a'+name0 + '" href="#0' + name0 + '" onclick="showPage(' + "'.pa-" + name0 + "'" + ')">' + name + '</a>';
    $('.mr-auto').append(node);
}

function makePageDiv(name, fname,func){
    console.log(name0);
    func = func || function(a){null;};
    var name0 = name.replace(' ','');
    fname = fname || name0;
    $('#contents')[0].innerHTML += "<div id='"+name0+"' class='pa-" + name0 + " page d-none' onclick='editThis()'><h2>" + name + "</h2></div>\n";
    activeToggle();

    var Data = $.get("contents/" + fname + ".html",
        function(data) {
            // console.log(data);
            // $('#' + name).html(data);
            $('.pa-'+name0+'.page').html(data);
            // console.log($('.'+name0+'.page').html());
            func(name0);
        });
    mJax(name0)
    // MathJax.Hub.Queue(["Typeset", MathJax.Hub, name0]);
}

function makePage(name){
    addtoNav(name);
    makePageDiv(name);
}


/* Research Pages
Each research page should contain an intro section which has an image and will
also be converted to a card and displayed in the Home page.
*/


function makeResearch(name, fname){
    makePageDiv(name, fname, function(a){
        addResearchCard('#res-cards', a);
    });
}

function addResearchCard(el,name){
    // must be done as callback. otherwise, element not ready when JQ calls
    var img = $('#'+name+'>.res-int>.media>img').attr('src');
    var title = $('#'+name+'>.res-int>.media>.media-body>h4').html();
    var content = $('#'+name+'>.res-int>.media>.media-body>p').html();
    console.log("name:",name,'img:',img,'title:',content);
    $('#res-cards')[0].innerHTML +=`<div class="col-sm-4">
            <div class="card mt-2">
                <!--Card image-->
                <div class="view overlay hm-white-slight">
                    <img src="`+img+`" class="img-fluid" alt="">
                    <a href="#">
                      <div class="mask"></div>
                    </a>
                </div>
                    
                <!--Card content-->
                <div class="card-body">
                    <!--Title-->
                    <h4 class="card-title">`+title+`</h4>
                    <!--Text-->
                    <p class="card-text">`+content+`</p>
                    <a href="#" class="btn btn-primary">More...</a>
                </div>
            </div>
        <!--/.Card-->
        </div>
    `;
    
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
        // put the page contents into the editor
        tinyMCE.activeEditor.setContent($(this).html());
    });
    
}

function updateContents() {
    var a = $('.edit');
    a.html(tinyMCE.activeEditor.getContent());
    mJax(a[0]);
}

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
    // tinyMCE.activeEditor.setContent(v.innerHTML);
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

function toggleEdit(){
    var e = $('#editor');
    if (e.hasClass('d-none')){
        e.removeClass('d-none');
        $('#edit1').text('Hide Editor');
    }else{
        e.addClass('d-none');
        $('#edit1').text('Show Editor');
    }
}

function dlActive() {
    var pg = $('.edit');
    var page = pg.attr('id');
    var content = pg.html();
    downloadPage( page + '.html',content);
}

function downloadPage(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
