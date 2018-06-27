import 'dart:async';
import 'dart:io';
import 'dart:convert';

import 'package:flutter/material.dart';
//import 'package:small_calendar/small_calendar.dart';
import 'package:side_header_list_view/side_header_list_view.dart';
import 'package:image_picker/image_picker.dart';
import 'package:location/location.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:geolocation/geolocation.dart';

void main() async{

    var token;
    var home_page;

  SharedPreferences prefs = await SharedPreferences.getInstance();
  token = prefs.getString('token');

  if (token != null){
    home_page = new viewAttendance();
  }
  else{
    home_page = new LoginPage();
  }

  runApp(
      new MyApp(home_page)
  );
  }

class MyApp extends StatelessWidget {

  var home_page;

  MyApp(page){
    this.home_page = page;
  }

  @override
  Widget build(BuildContext context) {
    return new MaterialApp(

      home: home_page,
        routes: <String, WidgetBuilder>
        {
          '/login': (BuildContext context) => new LoginPage(),
          '/view': (BuildContext context) => new viewAttendance(),
          '/camera': (BuildContext context) => new captureImage(),
        },
      theme: new ThemeData(
        primarySwatch: Colors.deepPurple,
        accentColor: Colors.teal
      )
    );
  }
}



class LoginPage extends StatefulWidget{
  @override
  State createState() => new LoginPageState();

}

class LoginPageState extends State<LoginPage> with SingleTickerProviderStateMixin{

  AnimationController _iconAnimationController;
  Animation<double> _iconAnimation;
  final usernameController = new TextEditingController();
  final passwordController = new TextEditingController();
  final String url = "http://att.amittechnology.com/api/login";


  @override
  void initState() {
    super.initState();
    _iconAnimationController = new AnimationController(
      vsync: this,
      duration: new Duration(milliseconds: 400)
    );

    _iconAnimation = new CurvedAnimation(
        parent: _iconAnimationController,
        curve: Curves.bounceOut,
    );
    _iconAnimation.addListener(() => this.setState((){}));
    _iconAnimationController.forward();
  }

  Future <String> postJSON(String username, String pwd) async{

    var body = jsonEncode({"username":username,"password":pwd});
    var response = await http.post(

        Uri.encodeFull(url),
      headers: {
          "Content-Type":"application/json",
        "Cache-Control":"no-cache"
      },
      body:body
    );

    var body_ret = jsonDecode(response.body);

    if (body_ret['Status'] == 1){

      var token = body_ret['Response']['token'];
      SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString('token', token);
      await prefs.setString('username', username);

      Navigator.of(context).pushNamed('/view');

    }
    else{

      var error = body_ret['Error'];
      Fluttertoast.showToast(
          msg: error,
          toastLength: Toast.LENGTH_LONG,
          gravity: ToastGravity.BOTTOM,
          timeInSecForIos: 2,
      );
    }

  }


  @override
  Widget build(BuildContext context){
    return new WillPopScope(
        onWillPop: () async => false,
        child: new Scaffold(
      backgroundColor: Colors.black,
      body: new Stack(
        fit:StackFit.expand,
        children: <Widget>[
          new Image(
              image: new AssetImage("assets/login_background.jpg"),
              fit:BoxFit.cover,
              color:Colors.black87,
              colorBlendMode: BlendMode.darken,
          ),
          new Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              new FlutterLogo(
                size: _iconAnimation.value * 100,
              ),
              new Form(
                child: new Theme(
                  data: new ThemeData(brightness: Brightness.dark, primarySwatch:Colors.teal
                  ),
                  child: new Container(
                    padding: EdgeInsets.all(40.0),
                  child: new Column(
                    children: <Widget>[
                      new TextFormField(
                        decoration: new InputDecoration(
                            labelText: 'Username'
                        ),
                        keyboardType: TextInputType.emailAddress,
                        controller: usernameController,
                      ),

                      new TextFormField(
                        decoration: new InputDecoration(
                            labelText: 'Password'
                        ),
                        keyboardType: TextInputType.text,
                        obscureText: true,
                        controller: passwordController,
                      ),
                      new Padding(
                          padding: const EdgeInsets.only(top: 20.0),
                      ),
                      new MaterialButton(
                          color: Colors.teal,
                          textColor: Colors.white,
                        child: new Text(
                          "Login"
                        ),
                        onPressed: () {
                          postJSON(usernameController.text,passwordController.text);
                        },
                        splashColor: Colors.green,

                      ),

                    ],
                  ),
                    ),
                      ),
              ),
            ],
          )
        ],
      ),
    ),
    );
  }
}

class viewAttendance extends StatefulWidget {

  @override
  State createState() => new viewAttendanceState();

}

class viewAttendanceState extends State<viewAttendance> {

  var _isLoading = false;
  var received_json;
  var _image;
  var months = ['','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  @override
  void initState() {
    super.initState();
    get_data();
  }

  Future <String> get_data() async {

    setState(() {
      _isLoading = true;
    });
    final String url = "http://att.amittechnology.com/api/viewAttendance";
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var token = await prefs.getString('token');
    print (token);
    var username = await prefs.getString('username');

    var current_dt= DateTime.now();
    current_dt = current_dt.add(new Duration(days:1));
    var current_d = "${current_dt.year.toString()}-${current_dt.month.toString().padLeft(2,'0')}-${current_dt.day.toString().padLeft(2,'0')}";

    var later_dt = current_dt.subtract(new Duration(days:31));
    var later_d = "${later_dt.year.toString()}-${later_dt.month.toString().padLeft(2,'0')}-${later_dt.day.toString().padLeft(2,'0')}";

    var body = jsonEncode({"username": username, "token": token, "dateMin": later_d, "dateMax":current_d});
    var response = await http.post(

        Uri.encodeFull(url),
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        },
        body: body
    );


    if (response.statusCode == 403){

      Navigator.of(context).pushNamed('/login');

    }
    print (response.body);

    var json_response = jsonDecode(response.body);

    setState(() {
      _isLoading = false;
    received_json = json_response['Response'];
    print(received_json.length);
    });
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("View Attendance"),
      ),
      drawer: new Drawer(
        child: new ListView(
          children: <Widget>[
            new UserAccountsDrawerHeader(
                accountName: new Text("Abhinav Garg"),
                accountEmail: new Text("abh.garg@hotmail.com"),
                currentAccountPicture: new CircleAvatar(
                  //backgroundImage: new AssetImage("assets/boy.png"),
                  child:new Text(
                      "A",
                      style: new TextStyle(
                          color: Colors.white,
                          fontSize: 25.0
                      ),
                  ),
                  backgroundColor: Colors.teal,
                ),
                /*decoration: new BoxDecoration(
                  color: Colors.black87,
                  image: new DecorationImage(
                    image: new ExactAssetImage('assets/login_background.jpg'),
                    fit: BoxFit.cover,
                    colorFilter: new ColorFilter.mode(Colors.black45, BlendMode.dstATop)
                  ),
                ),*/
            ),
            new ListTile(
              title: new Text("View Attendance"),
              leading: new Icon(Icons.calendar_today),
              onTap: () => Navigator.of(context).pop(),
            ),
            new ListTile(
              title: new Text("Mark Attendance"),
              leading: new Icon(Icons.camera),
              onTap: () => Navigator.of(context).pushNamed('/camera'),
            ),
            new ListTile(
              title: new Text("Logout"),
              leading: new Icon(Icons.exit_to_app),
              onTap: () => Navigator.of(context).pushNamed('/login'),
            )
          ],
        )

      ),
      body: received_json == null ?
      new Center(
          child: new CircularProgressIndicator(
        backgroundColor: Colors.greenAccent.shade700,
      )
      ) : (received_json.length == 0 ?
          new Center():
      new Stack(
        children: <Widget>[
          new SideHeaderListView(
            itemCount: received_json.length,
            padding: new EdgeInsets.all(16.0),
            itemExtend: 150.0,
            headerBuilder: (BuildContext context, int index) {

              return new SizedBox(width: 55.0,
                  child: new Row(
                      mainAxisSize: MainAxisSize.min,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        new Text(received_json[index][2].substring(8,11), style: Theme.of(context).textTheme.headline,),
                        new RotatedBox(
                          quarterTurns: 3,
                          child: new Text(months[int.parse(received_json[index][2].substring(5,7))]),
                        )
                   ]
                  )
              );
            },
            itemBuilder: (BuildContext context, int index) {
              //return new Text(names[index].substring(2,), style: Theme.of(context).textTheme.headline,);
              return new Card(
                child: new Column(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    new ListTile(
                      leading: new Image.memory(
                          base64Decode(received_json[index][0]),
                        width:80.0,
                        height:60.0

                      ),
                      title: new Text('Location'),
                      subtitle: new Text(received_json[index][1].toString().split(',')[0].substring(0,4) + ", "+received_json[index][1].toString().split(',')[1].substring(0,4)),
                    ),
                    new ButtonTheme.bar( // make buttons use the appropriate styles for cards
                      child: new ButtonBar(
                        children: <Widget>[
                          new FlatButton(
                            child: const Text('View on Map'),
                            onPressed: () { /* ... */ },
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              );
            },
            hasSameHeader: (int a, int b) {
              var first_dt = DateTime.parse(received_json[a][2]);
              var second_dt = DateTime.parse(received_json[b][2]);
              var first = "${first_dt.year.toString()}-${first_dt.month.toString().padLeft(2,'0')}-${first_dt.day.toString().padLeft(2,'0')}";
              var second = "${second_dt.year.toString()}-${second_dt.month.toString().padLeft(2,'0')}-${second_dt.day.toString().padLeft(2,'0')}";
              return first == second;
            },
          )

        ],
      ))
    );
  }
}


class Countdown extends AnimatedWidget {
  Countdown({ Key key, this.animation }) : super(key: key, listenable: animation);
  Animation<int> animation;

  @override
  build(BuildContext context){
    return new Text(
      animation.value.toString(),
      style: new TextStyle(fontSize: 150.0),
    );
  }
}

class captureImage extends StatefulWidget {

  @override
  State createState() => new captureImageState();

}

class captureImageState extends State<captureImage> with TickerProviderStateMixin{

  File _image;
  var _isLoading = false;

  AnimationController _controller;
  static const int kStartValue = 300;
  double lat;
  double long;
  var _current_time = null;
  var _clicked_time = null;
  String base64Image;

  final String url = "http://att.amittechnology.com/api/markAttendance";

  @override
  void initState() {
    super.initState();
    _controller = new AnimationController(
      vsync: this,
      duration: new Duration(seconds: kStartValue),
    );
  }

  String get timerString{
    Duration duration = _controller.duration * _controller.value;
    return '${duration.inMinutes}:${(duration.inSeconds % 60).toString().padLeft(2,'0')}';
  }

  Future <String> postJSON() async {

    setState((){
      _isLoading=true;
    });

    SharedPreferences prefs = await SharedPreferences.getInstance();
    var token = await prefs.getString('token');
    var username = await prefs.getString('username');

    var body = jsonEncode({"username": username, "token": token, "location": lat.toString() + "," + long.toString(),"picture":base64Image});
    print (body);
    var response = await http.post(

        Uri.encodeFull(url),
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        },
        body: body
    );

    var body_ret = jsonDecode(response.body);

    setState((){
      _isLoading=false;
    });

    if (body_ret['Status'] == 1){

      Fluttertoast.showToast(
        msg: "Attendance marked successfully",
        toastLength: Toast.LENGTH_LONG,
        gravity: ToastGravity.BOTTOM,
        timeInSecForIos: 2,
      );

      Navigator.of(context).pushNamed('/view');

    }
    else{

      var error = body_ret['Error'];
      Fluttertoast.showToast(
        msg: error,
        toastLength: Toast.LENGTH_LONG,
        gravity: ToastGravity.BOTTOM,
        timeInSecForIos: 2,
      );

      Navigator.of(context).pushNamed('/camera');
    }

    print (response.body);
  }


  Future getImage() async {
    var image = await ImagePicker.pickImage(source: ImageSource.camera,maxHeight: 600.0, maxWidth: 800.0);

    setState(() {
      _image = image;
      _clicked_time=new DateTime.now();

      var time_diff = _clicked_time.difference(_current_time);
      if (time_diff.inMinutes > 5)
        {
          Fluttertoast.showToast(
            msg: "You were late kindly try again",
            toastLength: Toast.LENGTH_LONG,
            gravity: ToastGravity.BOTTOM,
            timeInSecForIos: 2,
          );
          Navigator.of(context).pushNamed('/camera');

        }

        else{

        List<int> imageBytes = _image.readAsBytesSync();
        base64Image = base64Encode(imageBytes);
        postJSON();
      }
    });
  }


  checkGPS() async{
    final GeolocationResult result = await Geolocation.isLocationOperational();

    if (result.isSuccessful){
      print('Success');
      getLocation();
    }

    else{
      final GeolocationResult result = await Geolocation.requestLocationPermission(const LocationPermission(
        android: LocationPermissionAndroid.fine,
        ios: LocationPermissionIOS.always,
      ));
      if(result.isSuccessful) {
        print('Got permission');
        getLocation();
      } else {
        print('Permission Denied');
        Fluttertoast.showToast(
          msg: "Kindly turn on your GPS from settings",
          toastLength: Toast.LENGTH_LONG,
          gravity: ToastGravity.BOTTOM,
          timeInSecForIos: 2,
        );
        }
    }
  }

  getLocation() {
    StreamSubscription<LocationResult> subscription = Geolocation.currentLocation(accuracy: LocationAccuracy.best).listen((result) {
      if(result.isSuccessful) {
        double latitude = result.location.latitude;
        double longitude = result.location.longitude;
        setState(() {
          lat = latitude;
          long=longitude;
        });
      }
    });


  }

  @override
  Widget build(BuildContext context) {

    List<Widget> widgets;
    widgets = new List();

    if (lat == null) {
      widgets = [new MaterialButton(
        onPressed: checkGPS,
        color: Colors.teal,
        textColor: Colors.white,
        child: new Text(
            "Capture GPS Co-Ordinates"
        ),
      )];
    } else {
      print (lat);
      _controller.reverse(from: 300.0);
      _current_time = new DateTime.now();
      widgets = [
        new Padding(padding:new EdgeInsets.all(15.0),
            child:new Text("GPS Co-Ordinates Captured")
        ),
        new Padding(padding:new EdgeInsets.all(15.0),
          child: new Text("Kindly click a picture"),
        ),
    new Padding(padding:new EdgeInsets.all(15.0),
      child: new AnimatedBuilder(animation: _controller, builder: (BuildContext context, Widget child){
        return new Text(timerString);
      }
      )
    ),
      new Padding(padding:new EdgeInsets.all(15.0),
        child: new MaterialButton(
            onPressed: getImage,
            color: Colors.teal,
            textColor: Colors.white,
            child: new Text("Click Image"),
        )
      )
      ];
    }

    return new Scaffold(
      appBar: new AppBar(
        title: new Text('Mark Attendance'),
      ),
      drawer: new Drawer(
          child: new ListView(
            children: <Widget>[
              new UserAccountsDrawerHeader(
                accountName: new Text("Abhinav Garg"),
                accountEmail: new Text("abh.garg@hotmail.com"),
                currentAccountPicture: new CircleAvatar(
                  //backgroundImage: new AssetImage("assets/boy.png"),
                  child:new Text(
                    "A",
                    style: new TextStyle(
                        color: Colors.white,
                        fontSize: 25.0
                    ),
                  ),
                  backgroundColor: Colors.teal,
                ),
              ),
              new ListTile(
                title: new Text("View Attendance"),
                leading: new Icon(Icons.calendar_today),
                onTap: () => Navigator.of(context).pushNamed('/view'),
              ),
              new ListTile(
                title: new Text("Mark Attendance"),
                leading: new Icon(Icons.camera),
                onTap: () => Navigator.of(context).pop(),
              ),
              new ListTile(
                title: new Text("Logout"),
                leading: new Icon(Icons.exit_to_app),
                onTap: () => Navigator.of(context).pushNamed('/login'),
              )
            ],
          )

      ),
      body: _isLoading ?
      new Center(
          child: new CircularProgressIndicator(
            backgroundColor: Colors.greenAccent.shade700,
          )
      ) :
      new Center(
        child: new Card(
        child: new Column(
        mainAxisSize: MainAxisSize.min,
        children: widgets,
    ),
        )
      ),
    );
  }
}