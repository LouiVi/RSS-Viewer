cfg.Light, cfg.MUI;
app.LoadPlugin( "Utils" );
utils = app.CreateUtils();
var template = "";
var  feed  = "https://www.espn.com/espn/rss/news";
	var categories = ["Ultima Hora", "Noticias", "Negocios", "Entretenimiento", "Deportes", "English", "Gastronomía", "De Viaje", "Galerías", "Opinión", "Estilos de vida"];

var feeds = ["https://la-guaridadelbigfoot.blogspot.com/feeds/posts/default","https://www.elnuevodia.com/arc/outboundfeeds/rss/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/noticias/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/negocios/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/entretenimiento/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/deportes/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/english/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/gastronomia/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/de-viaje/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/?query=type:gallery?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/opinion/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/estilos-de-vida/?outputType=xml"];
fed = "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml";//https://www.pressdisplay.com/pressdisplay/services/rss.ashx?cid=34pj&type=full";//http://feeds.people.com/people/headlines";//http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml";//http://rssfeeds.usatoday.com/usatoday-NewsTopStories";
async function OnStart()
{
 lay = MUI.CreateLayout("Linear", "Top,HCenter,FillXY")
        scrl = app.CreateScroller(1, -1, "NoScrollBar")
            lay2 = MUI.CreateLayout("Linear", "Top,HCenter")
            apb = MUI.CreateAppBar("RSS Feeds", "menu", "more_vert")
        var apbHeight = apb.GetHeight()
lay.AddChild( apb );
	web = app.CreateWebView( 1, -1 )
	lay.AddChild( web )
	
	//Add layout to app.	
	app.AddLayout( lay )
	await parseRSSFeed(feeds[0]);
}

function parseRSSFeed(url) {
    // Create an XML HTTP request to fetch the RSS feed
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Parse the RSS feed
            var xml = xhr.responseXML;
            //app.WriteFile( "rss.txt", xhr.responseText);
            var items = xml.getElementsByTagName("item");

            // Loop through each item in the RSS feed
            for (var i = 0; i < items.length; i++) {
                var title = items[i].getElementsByTagName("title")[0].textContent;
                var description = items[i].getElementsByTagName("description")[0].textContent;
                var media = items[i].getElementsByTagName("media:thumbnail")[0] || items[i].getElementsByTagName("media:content")[0];
                var imageUrl = media ? media.getAttribute("url") : "";
                //app.DeleteFile( "/storage/emulated/0/Download/rssImages/imgEspn"+(i+1)+".jpg" );
                  // if(!app.FileExists( "/storage/emulated/0/Download/rssImages/imgEspn"+(i+1)+".jpg") ) app.DownloadFile( imageUrl, "/storage/emulated/0/Download/rssImages/imgEspn"+(i+1)+".jpg", "Download image","Download" )
                //cc.push(i);
                //tt.push(title);
                //ii.push(imageUrl);
                //app.ShowPopup( items[i].getElementsByTagName("link")[0].textContent );
                //ll.push(items[i].getElementsByTagName("link")[0].textContent);
                templateTmp = app.ReadFile( "template.txt" );
                templateTmp = templateTmp.replace("[TITLE]", title).replace("[IMAGEURL]", imageUrl).replace("[BODY]", description).replace("[LINK]", items[i].getElementsByTagName("link")[0].textContent);
                template += templateTmp;
                    //Add some data (with error handler).  
    //db.ExecuteSql( "INSERT INTO feeds(title, description, media, image, link)" +   
        //" VALUES (?,?,?,?,?)", [title, description, media, "/storage/emulated/0/Download/rssImages/imgEspn"+(i+1)+".jpg", items[i].getElementsByTagName("link")[0].textContent], null, ()=>{alert("error");})  

                //app.ShowPopup( imageUrl );
                /*if(!app.FileExists( "/storage/emulated/0/Download/rssImages/imgEspn"+(i+1)+".jpg") ) {
                setTimeout(OnStart, 15000);
                app.DownloadFile( imageUrl, "/storage/emulated/0/Download/rssImages/imgEspn"+(i+1)+".jpg", "Download image","Download" )
                }*/
                // Create a card for each item
              /*  var card = UI.CreateCard({
                		width:1,
                		buttonText: "Leer Noticia",
                    title: title,
                    color: "#cf3434",
                    body: description,
                    image: /*imageUrl*///"/storage/emulated/0/Download/rssImages/imgEspn"+(i+1)+".jpg",
                    //avatar: /*imageUrl*/"/storage/emulated/0/Download/rssImages/imgEspn"+(i+1)+".jpg",
                    //divider1: true,
                    //divider2: true
                //});
                /*
                card.name = "card"+(i+1),
                card.index = i;
								card.SetOnButtonTouch(OnBtnTouch);
								card.SetOnTitleTouch(OnBtnTouch);
								card.SetOnAvatarTouch(OnImgTouch);
								card.SetOnImageTouch(OnImgTouch)
                // Add the card to the UI
                lay2.AddChild(card);
                card.Animate("Rubberband");
                /*
                for (var h = 0; h < card.GetChildCount(); h++) {
        var child = card.GetChild(h);
        if (child.GetType() === "Text") {
            child.SetFontFile("Misc/PlayfairDisplay-Regular.ttf"); // Change to desired font type
        }
    }*/
    
   
           }
        }
        web.LoadHtml( "<center>"+app.ReadFile(  "css.txt")+template +"</center>");
    };
    xhr.send();
}