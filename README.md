# chat app 
## description
chat app supports sending messages from sender to receiver</br>
can create, edit, update, and delete messages</br>
each post is a document with input fields: 
* sender
* receiver
* message
* file transfer
* sender's favorite language
## a link to the deployed copy of chat app
https://i6.cims.nyu.edu/~xl3504/web-app-xi-liu-cs/flask.cgi

## full name and link to github account
Xi Liu, xl3504, https://github.com/xi-liu-cs

## home page
```html
{% extends 'base.html' %}

{% block container %}
<h2>welcome!</h2>
<p>welcome to chat app. this is the home page. here are a few links to related pages
    <ul>
        <li><a href="{{ url_for('read')}}">a page that displays messages stored in a mongodb database collection</a></li>
        <li><a href="{{ url_for('create')}}">a page with a form you can submit to send a new message in a MongoDB collection</a></li>
    </ul>
</p>
{% endblock %}
```
![home](https://github.com/dbdesign-assignments-spring2022/web-app-xi-liu-cs/blob/main/images/home.png)

## create_post() in app.py
```python
@app.route('/create', methods=['POST'])
def create_post():
    """
    Route for POST requests to the create page.
    Accepts the form submission data for a new document and saves the document to the database.
    """
    sender_name = request.form["sender_name"]
    receiver_name = request.form["receiver_name"]
    message_name = request.form["message_name"]
    file_name = request.form["file_name"]
    fav_lang = request.form["fav_lang"]

    # create a new document with the data the user entered
    doc = {
        "sender_name": sender_name,
        "receiver_name": receiver_name,
        "message_name": message_name, 
        "file_name": file_name,
        "fav_lang": fav_lang,
        "created_at": datetime.datetime.utcnow()
    }
    db.exampleapp.insert_one(doc) # insert a new document

    return redirect(url_for('read')) # tell the browser to make a request for the /read route
```
## create.html
```html
{% extends 'base.html' %} {% block container %}
<h2>create</h2>
<p>create a new message from a sender to a receiver in the mongodb database collection</p>
<form method="post" action="{{ url_for('create_post') }}">
  <p>
    sender: <input type="text" id="send_id" name="sender_name" /><br />
  </p>
  <p>
    receiver: <input type="text" id="receive_id" name="receiver_name" /><br />
  </p>
  <p>
    message:  <textarea type="text" id="message_id" name="message_name"></textarea>
  </p>
  <p>
    file: <input type = "file" id = "file_id", name = "file_name"/>
  </p>
    sender's favorite language is: <br>
    <input type = "radio", id = "c_id", name = "fav_lang" value = "c">
    <label for = "c_id">c</label><br>
    <input type = "radio", id = "c++_id", name = "fav_lang" value = "c++">
    <label for = "c++_id">c++</label><br>
    <input type = "radio", id = "assembly_id", name = "fav_lang" value = "assembly">
    <label for = "assembly_id">assembly</label><br>
    <input type = "radio", id = "java_id", name = "fav_lang" value = "java">
    <label for = "java_id">java</label><br>
    <input type = "radio", id = "python_id", name = "fav_lang" value = "python">
    <label for = "python_id">python</label><br>
    <input type = "radio", id = "javascript_id", name = "fav_lang" value = "javascript">
    <label for = "javascript_id">javascript</label><br>
    <input type = "radio", id = "html/css_id", name = "fav_lang" value = "html/css">
    <label for = "html/css_id">html/css</label><br>
    <input type = "radio", id = "sql_id", name = "fav_lang" value = "sql">
    <label for = "sql_id">sql</label><br>
  <p>
    <a href="{{ url_for('read')}}">cancel</a>
    <input type="submit" name="post-btn" value="send" />
  </p>
</form>
{% endblock %}
```
![create](https://github.com/dbdesign-assignments-spring2022/web-app-xi-liu-cs/blob/main/images/create.png)

## edit_post() in app.py  
```python
@app.route('/edit/<mongoid>', methods=['POST'])
def edit_post(mongoid):
    """
    Route for POST requests to the edit page.
    Accepts the form submission data for the specified document and updates the document in the database.
    """
    sender_name = request.form["sender_name"]
    receiver_name = request.form["receiver_name"]
    message_name = request.form["message_name"]
    file_name = request.form["file_name"]
    fav_lang = request.form["fav_lang"]

    doc = {
        "_id": ObjectId(mongoid), 
        "sender_name": sender_name,
        "receiver_name": receiver_name,
        "message_name": message_name, 
        "file_name": file_name,
        "fav_lang": fav_lang,
        "created_at": datetime.datetime.utcnow()
    }
    db.exampleapp.update_one(
        {"_id": ObjectId(mongoid)}, # match criteria
        { "$set": doc }
    )

    return redirect(url_for('read')) # tell the browser to make a request for the /read route
```
## edit.html
```html
{% extends 'base.html' %} {% block container %}
<h2>update</h2>
<p>edit a message in the mongodb database collection</p>
<form method="post" action="{{ url_for('edit_post', mongoid = mongoid) }}">
    <p>
      sender: <input type="text" id="send_id" name="sender_name" value = "{{doc.sender_name}}"/><br />
    </p>
    <p>
      receiver: <input type="text" id="receive_id" name="receiver_name" value = "{{doc.receiver_name}}"/><br />
    </p>
    <p>
      message:  <textarea type="text" id="message_id" name="message_name">{{doc.message_name}}</textarea>
    </p>
    <p>
      sender's previous file transfer is: {{doc.file_name}}<br>
      sender's new file transfer is:<br>
      file: <input type = "file" id = "file_id", name = "file_name"/>
    </p>
      sender's previous favorite language is: {{doc.fav_lang}}<br>
      sender's new favorite language is:<br>
      <input type = "radio", id = "c_id", name = "fav_lang" value = "c">
      <label for = "c_id">c</label><br>
      <input type = "radio", id = "c++_id", name = "fav_lang" value = "c++">
      <label for = "c++_id">c++</label><br>
      <input type = "radio", id = "assembly_id", name = "fav_lang" value = "assembly">
      <label for = "assembly_id">assembly</label><br>
      <input type = "radio", id = "java_id", name = "fav_lang" value = "java">
      <label for = "java_id">java</label><br>
      <input type = "radio", id = "python_id", name = "fav_lang" value = "python">
      <label for = "python_id">python</label><br>
      <input type = "radio", id = "javascript_id", name = "fav_lang" value = "javascript">
      <label for = "javascript_id">javascript</label><br>
      <input type = "radio", id = "html/css_id", name = "fav_lang" value = "html/css">
      <label for = "html/css_id">html/css</label><br>
      <input type = "radio", id = "sql_id", name = "fav_lang" value = "sql">
      <label for = "sql_id">sql</label><br>
    <p>
      <a href="{{ url_for('read')}}">cancel</a>
      <input type="submit" name="post-btn" value="save" />
    </p>
  </form>
{% endblock %}
``` 
![edit](https://github.com/dbdesign-assignments-spring2022/web-app-xi-liu-cs/blob/main/images/edit.png)

## read.html
```html
{% extends 'base.html' %}

{% block container %}
<h2>read</h2>
<p>this page shows information pulled from a mongodb database collection
        
    {% for doc in docs %}
    <div>
        <hr class="solid">
        <p class="post"> 
        <p>
            time is {{ doc.created_at.strftime("%H:%M on %d %B %Y") }} 
            </br>
            sender is {{doc.sender_name}} </br>
            receiver is {{doc.receiver_name}} </br>
            message is: {{ doc.message_name }} </br>
            file transferred is: {{ doc.file_name }} </br>
            sender's favorite language is: {{ doc.fav_lang }} </br>
            <a href="{{ url_for('edit',mongoid=doc._id)}}">edit</a> | <a href="{{ url_for('delete',mongoid=doc._id)}}">delete</a>
        </p>
    </div>
    {%endfor%}
</p>
{% endblock %}
```
![read](https://github.com/dbdesign-assignments-spring2022/web-app-xi-liu-cs/blob/main/images/read.png)
