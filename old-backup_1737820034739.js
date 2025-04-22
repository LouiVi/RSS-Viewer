cfg.Light, cfg.MUI;
app.LoadPlugin( "Utils" );
utils = app.CreateUtils();

var cc = new Array();
var tt = new Array();
var ii = new Array()
var ll = new Array();
var  feed  = "https://www.espn.com/espn/rss/news";
	var categories = ["Ultima Hora", "Noticias", "Negocios", "Entretenimiento", "Deportes", "English", "Gastronomía", "De Viaje", "Galerías", "Opinión", "Estilos de vida"];

var feeds = ["https://www.elnuevodia.com/arc/outboundfeeds/rss/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/noticias/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/negocios/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/entretenimiento/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/deportes/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/english/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/gastronomia/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/de-viaje/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/?query=type:gallery?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/opinion/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/estilos-de-vida/?outputType=xml"];
fed = "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml";//https://www.pressdisplay.com/pressdisplay/services/rss.ashx?cid=34pj&type=full";//http://feeds.people.com/people/headlines";//http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml";//http://rssfeeds.usatoday.com/usatoday-NewsTopStories";
async function OnStart()
{
//w = prompt("",utils.GetDSPath())
//Create or open a database called "MyData".  
//alert(app.ListFolder( utils.GetDSPath()+"/DroidScript/"+app.GetAppName()+"/", "",-1 ))
    db = app.OpenDatabase( utils.GetDSPath()+"/DroidScript/"+app.GetAppName()+"/Rssx.sqlite.txt" )  
      
    //Create a table (if it does not exist already).  
    db.ExecuteSql( "CREATE TABLE IF NOT EXISTS feeds " +  
        "(title text primary key not null, description text, media text, image text, link text)" );

    //Get all the table rows.      
//app.DeleteFolder( "/storage/emulated/0/Download/rssImages/" );
//app.MakeFolder( "/storage/emulated/0/Download/rssImages/" );
    lay = MUI.CreateLayout("Linear", "Top,HCenter,FillXY")
        scrl = app.CreateScroller(1, -1, "NoScrollBar")
            lay2 = MUI.CreateLayout("Linear", "Top,HCenter")
            apb = MUI.CreateAppBar("RSS Feeds", "menu", "more_vert")
        var apbHeight = apb.GetHeight()
lay.AddChild( apb );
//app.CopyFile( "Misc/Eczar-Medium.ttf", "/Sys/fonts/mui/Medium.ttf");
            MUI.fonts["bold"] = "Misc/SixtyfourConvergence-Regular-VariableFont.ttf";//Misc/PlayfairDisplay-Regular.ttf";//Misc/ArchitectsDaughter-Regular.ttf";
            MUI.fonts["thin"] = "Misc/Rowdies-Light.ttf";
            MUI.fonts["regular"] = "Misc/Eczar-Medium.ttf";//Misc/PoiretOne-Regular.ttf";//Misc/PlayfairDisplay-Regular.ttf",//Misc/PlayfairDisplay-VariableFont_wght.ttf";
            MUI.fonts["medium"] = "Misc/BebasNeue-Regular.ttf";
            MUI.fonts["light"] = "Misc/BebasNeue-Regular.ttf";
            //alert(JSON.stringify(MUI.fonts));
           /* app.SetClipboardText( JSON.stringify(MUI.fonts) )
            app.Exit()*/
            lay2.SetPadding(0, 0.02, 0, 0.02)
            lay2.SetSize(1)
            /*
                var options = {
                    title: "Card Title",
                    body: "Lorem ipsum dolor set amit consectetur elit",
                    buttonText: "LINKS,SEE MORE",
                    image: "/Sys/Img/Sky.jpg",
                    width: 0.94,
                    avatar: "/Sys/Img/Droid1.png",
                    avatarOnTop: true,
                    divider1: true,
                    divider2: true
                }

                options.name = "my-card1"
                card1 = UI.CreateCard(options)
                lay2.AddChild(card1)
                card1.SetOnButtonTouch(OnBtnTouch)
                */
                //app.GetPermission(  )

            scrl.AddChild(lay2)
        lay.AddChild(scrl)
    app.AddLayout(lay)
   // await parseRSSFeedDownloadImage(fed);
    //app.Wait(15, false);
    await parseRSSFeed(feeds[4]);//"https://www.elnuevodia.com/arc/outboundfeeds/rss/category/negocios/?outputType=xml"); //https://www.elnuevodia.com/arc/outboundfeeds/rss/?outputType=xml");
//MUI.fonts["medium"] = "Misc/BebasNeue-Regular.ttf";
    
		
		/*
		
		 var index = 0;
    var child;
    
    while (true) {
        child = card.GetChild(index);
        if (!child) break; // Exit loop if no more children
        
        if (child.GetType() === "Text") {
        child.SetFontFile("Misc/PlayfairDisplay-Regular.ttf"); // Change to desired font type
            //child.SetFont("Arial"); // Change to desired font type
        }
        
        index++;
    }
		
		*/
   // app.Alert( lst.join( "\n" ));
}

async function parseRSSFeedDownloadImage(url) {
    // Create an XML HTTP request to fetch the RSS feed
    var xhr = new XMLHttpRequest();
    await xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Parse the RSS feed
            var xml = xhr.responseXML;
            //app.WriteFile( "rss.txt", xhr.responseText);
            var items = xml.getElementsByTagName("item");

            // Loop through each item in the RSS feed
            for (var i = 0; i < items.length; i++) {
            		var media = items[i].getElementsByTagName("media:thumbnail")[0] || items[i].getElementsByTagName("media:content")[0];
                   var imageUrl = media ? media.getAttribute("url") : "";
                   app.DeleteFile( "/storage/emulated/0/Download/rssImages/imgEspn"+(i+1)+".jpg" );
                   if(!app.FileExists( "/storage/emulated/0/Download/rssImages/imgEspn"+(i+1)+".jpg") ) app.DownloadFile( imageUrl, "/storage/emulated/0/Download/rssImages/imgEspn"+(i+1)+".jpg", "Download image","Download" )
            }
        }
    };
    xhr.send();
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
                   if(!app.FileExists( "/storage/emulated/0/Download/rssImages/imgEspn"+(i+1)+".jpg") ) app.DownloadFile( imageUrl, "/storage/emulated/0/Download/rssImages/imgEspn"+(i+1)+".jpg", "Download image","Download" )
                cc.push(i);
                tt.push(title);
                ii.push(imageUrl);
                //app.ShowPopup( items[i].getElementsByTagName("link")[0].textContent );
                ll.push(items[i].getElementsByTagName("link")[0].textContent);
                    //Add some data (with error handler).  
    db.ExecuteSql( "INSERT INTO feeds(title, description, media, image, link)" +   
        " VALUES (?,?,?,?,?)", [title, description, media, "/storage/emulated/0/Download/rssImages/imgEspn"+(i+1)+".jpg", items[i].getElementsByTagName("link")[0].textContent], null, ()=>{alert("error");})  

                //app.ShowPopup( imageUrl );
                /*if(!app.FileExists( "/storage/emulated/0/Download/rssImages/imgEspn"+(i+1)+".jpg") ) {
                setTimeout(OnStart, 15000);
                app.DownloadFile( imageUrl, "/storage/emulated/0/Download/rssImages/imgEspn"+(i+1)+".jpg", "Download image","Download" )
                }*/
                // Create a card for each item
                var card = UI.CreateCard({
                		width:1,
                		buttonText: "Leer Noticia",
                    title: title,
                    color: "#cf3434",
                    body: description,
                    image: /*imageUrl*/"/storage/emulated/0/Download/rssImages/imgEspn"+(i+1)+".jpg",
                    avatar: /*imageUrl*/"/storage/emulated/0/Download/rssImages/imgEspn"+(i+1)+".jpg",
                    divider1: true,
                    divider2: true
                });
                
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
    };
    xhr.send();
    setTimeout(()=>{conti();}, 7500);
}

function conti()
{
	var objs = app.GetObjects();

    var lst = new Array()
    for(var i in objs){
        if(objs[i].GetType() == "Image") {
        	objs[i].SetOnLoad((img)=>{objs[i].Show();objs[i].SetImage(img);app.ShowPopup(JSON.stringify(img) )});
        }
        //lst.push(objs[i].GetType());
        lst.push(objs[i].data);
        //objs[i].SetFontFile("Misc/SixtyfourConvergence-Regular-VariableFont.ttf");
		}
		app.WriteFile( "dat.txt", lst.join("\r\n" ));
		
}

function CheckArrays(cardName)
{
	c = 0
		while(c<ll.length){
			if(tt[c] === cardName) {
				//alert("Link: #" + c + ", " + ll[c]);
				if(confirm("Do you want to vie the rest of the news in the browser?")) app.OpenUrl( ll[c] );
				app.ShowPopup( ll[c] )
				break;
			}
			c++;
		}
}

function OnBtnTouch(btnText, cardName)
{
		var self = this;
		CheckArrays(cardName);
    app.ShowPopup(btnText + " : " + cardName)
}

function OnImgTouch(cardName)
{
    app.ShowPopup(cardName)
}