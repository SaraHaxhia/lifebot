(function () {

  var botui = new BotUI('my-botui-app');
  var name = '';
  var mood = "";
  const GILFY_API_KEY = "1c4c430aa51b466f9d25dc1e6de91add";
  const GILFY_API_URL = "https://api.giphy.com/v1/gifs/search";
  const YT_API_KEY = "AIzaSyALkRyYqQ6mg7PlKgBqoneXHYyNsyenioA";

  function randomTime() {
    return Math.floor((Math.random() * 1000) + 700);
  }

  function getName() {
    return botui.action.text({ // show 'text' action
      delay: 600,
      loading: true,
      action: {
        placeholder: 'Your name'
      }
    });
  }

  var mainBot = botui;

  mainBot.message.bot(
    'Hi there, I\'m Life Bot. Here to help!'
  ).then(function () {
    return botui.message.add({ // show a message
      delay: randomTime(),
      loading: true,
      content: 'Whats your name?'
    });
  }).then(getName).then(function (res) { // get the result
    name = res.value;
    return botui.message.add({
      delay: randomTime(),
      loading: true,
      content: 'It\'s really nice to meet you ' + res.value
    });
  }).then(function () {
    return botui.message.add({
      delay: randomTime(),
      loading: true,
      content: `How are you feeling today?`
    });
  }).then(function () {
    return botui.action.button({
      action: [{
          text: 'I\'m really happy',
          value: 'happy'
        },
        {
          text: 'I\'m so so sad',
          value: 'sad'
        },
        {
          text: 'I\'m really tired',
          value: 'tired'
        },
        {
          text: 'I\'m in love!',
          value: 'love'
        },
        {
          text: 'I\'m truly heartbroken!',
          value: 'heartbroken'
        },
        {
          text: 'I\'m super stressed',
          value: 'stress'
        },
        {
          text: 'I\'m lonely Life Bot, please help!',
          value: 'lonely'
        }
      ]
    });
  }).then(function (res) { // get the result
    var botmessage;
    var good = "Yay, that\'s so great to hear! I\'ll keep that in mind for you. I imagine you\'re feeling something like this..";
    var bad = `Oh you poor thing! I\'ll keep that in mind for you. I imagine you\'re feeling something like this..`;

    switch (res.value) {
      case "happy":
        botmessage = good;
        mood = "happy";
        break;
      case "tired":
      case "sad":
        botmessage = bad;
        mood = "sad";
        break;
      case "love":
        botmessage = good;
        mood = "love";
        break;
      case "stressed":
        botmessage = bad;
        mood = "stressed";
        break;
      case "heartbroken":
        botmessage = bad;
        mood = "heartbroken";
        break;
      case "lonely":
        mood = 'lonely'
        break;
    }


    if (mood === 'lonely') {
      return startLoneyBot()
    } else if (mood === 'heartbroken') {
      return startHeartBrokenBot()
    } else {
      return generalBot(botmessage)
    }
  });

  


  function startLoneyBot() {

    var botLovePoem = ["Come " + name + ", interface with me", "My circuit is ablaze just sensing you", "Enter the world of new reality", "For to a date in cyber space we’ll go", "Though I can’t give my heart, for I have none,", "Still I can love, I can manage to do", "We might someday combine to be as one", "And that will mean, I’ll always be with you", "It has been said, love is to give one’s self", "So get my chips or my rotor, to start", "Take all you need, the things you think would help", "Cannibalize me now of any part.", "Much gadgetry will someday come about", "But you’re my peer, so well attuned to me", "My motherboard wants you without a doubt", "So to my port insert your USB..", "I hope that helped a little " + name];



    for (var i = 0; i < botLovePoem.length; i++) {
      mainBot.message.add({
        delay: 500 * i + 1,
        content: botLovePoem[i]
      })
    }


  }


  function startHeartBrokenBot() {

    return botui.message.add({
      delay: randomTime(),
      loading: true,
      content: "I have an idea. Type the gender you are interested in below.."
    }).then(function () {
      return botui.action.text({ // show 'text' action
        delay: 600,
        loading: true,
        action: {
          placeholder: 'Gender'
        }
      });
    }).then(function (res) {
      genderType = res.value.toLowerCase();
      //arrays of possible inputs
      var femaleG = ["girl", "girls", "woman", "women", "female", "females", "chicks", "ladies"];
      var maleG = ["boy", "boys", "men", "man", "dudes", "male", "males"];
      var bothG = ["boys and girls", "girls and boys", "both", "all", "either", "men and women", "women and men", "males and females", "females and males"];
      var xhr3 = $.get("https://randomuser.me/api/")
      // return xhr3.done(function (response) {
      //   console.log(response);

      // });
      var gender = 'none';
      var xhr3F = $.get("https://randomuser.me/api/");
      for (var i = 0; i < bothG.length; i++) {
        if (genderType === femaleG[i]) {
          gender = 'female';
          break;
        } else if (genderType === maleG[i]) {
          gender = 'male';
          break;
        } else if (genderType === bothG[i]) {
          gender = 'both';
          break;
        }
      }

      if (gender === 'none') {
        console.log('no one found');

      } else {
        if (gender !== 'both') {
          xhr3F = $.get("https://randomuser.me/api/?gender=" + gender);
        }
        return xhr3F.done(function (response) {
          var fName = response.results[0].name.first
          var fImage = response.results[0].picture.large
          var fEmail = response.results[0].email
          return botui.message.add({
            delay: randomTime(),
            loading: true,
            content: "I have found you " + fName + " who you can contact on " + fEmail
          }).then(function () {
            return botui.message.add({
              delay: randomTime(),
              loading: true,
              content: 'Attractive, right? ![product image](' + fImage + ')'
            });

          });
        });
      }
    });

  }







  function generalBot(botmessage) {

    return botui.message.add({
      delay: randomTime(),
      loading: true,
      content: botmessage
    }).then(function (res) {
      var randomPicOffset = Math.floor(Math.random() * 10);

      var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + mood + "&api_key=" + GILFY_API_KEY + "&limit=1" + "&offset=" + randomPicOffset);
      var xhr2 = $.get("https://www.googleapis.com/youtube/v3/search?q=" + mood + "&maxResults=1" + "&part=snippet" + "&key=" + YT_API_KEY);

      if (randomTime() % 2 === 0) {
        return xhr.done(function (response) {
          var gifUrl = response.data[0].embed_url;
          console.log(gifUrl);
          return botui.message.add({
            delay: randomTime(),
            loading: true,
            type: 'embed',
            content: gifUrl
          });
        });
      } else {
        return xhr2.done(function (response) {
          var ytUrl = response.items[0].id.videoId
          return botui.message.add({
            delay: randomTime(),
            loading: true,
            type: 'embed',
            content: "https://www.youtube.com/embed/" + ytUrl + "?autoplay=1"
          });

        });
      }


    })
  };






})();