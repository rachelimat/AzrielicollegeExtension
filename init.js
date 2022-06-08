(function () {
  
  function fnAddButtons() {
    
    var btn = document.createElement("input");
    btn.type="submit"
    btn.id = "search-mm-btn";
    var str =`<img src="data:image/png;
    base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAA7CAMAAADxTAypAAAAVFBMVEVHcEyxzjKlpaaXl5eQkJDBwcH19vaMjY3Jycmampvq8snV1dW4ubnl5ubF2maMj5C9vb6nqamrrK2NkJGQk5SSlZamp6iUl5iwsrOZnJ2ur7Cfn6DVff5tAAAAAXRSTlMAQObYZgAAATlJREFUWMPt1tlygzAMBVBCsK6M5NhsWf//P8tkm6STOE5MH9pyn+GMdAcDRfEDWdv0RJiyQnJi01QtJ8U0fXQaTlyfo0shlTHLmXkSmruZu5m7mbv5Xd2Qsf+NWU/DHKZh7FOmridhFovV32DcZudOvdT1yNQ3/bzDbIH9aZJLVp8wPTC4bEY94DV7qQG99Zvcik0HZu9NHkM7DEQDDpTFcActyKDjnMNAJXyrugfWlHE0pbv81PeSwbTwZTOm9Ng+/DIkMbJEczwIrkXv3v3AXBlFd95FAP3eDpHTXQLjLMrzvdRgczcOtyoSrCYw4nEtloG7kqXVoKKSwJCa6yIU7jt2QYhccB+9tm6KCeMgwpTJFCPjNDZMGsNSmOgwiQxziF9hYV4zeoj2e2Sql0G1f6EkMdWjB+8LlZAWgedbZDQAAAAASUVORK5CYII=" alt="מעבר מהיר בתפריט לשאילתה רשימת ציונים" class="ButtonMenuImage Grades" id="MenuIcon_11">
    <span class="ButtonMenuFont">רשימת ציונים</span>`
    var res = htmlToElement(str);
    btn.appendChild(res)

    
    btn.onclick = function(){
     
      document.addEventListener('yourCustomEvent', function (e) {
        
        var data = e.detail;
        console.log('received', data);
        // for (let letter = 1; letter < 23; letter++) {
        //   for (let year = 2017; i < new Date().getFullYear()+1; year++) 
        //     requestAllCoursesName(data,letter,2021);
        // }
        request(data,encodeURI("מסדי נתונים"),2021)
      });
      

      var actualCode ="document.dispatchEvent(new CustomEvent('yourCustomEvent', { detail: generatedToken }))";

      document.documentElement.setAttribute('onreset', actualCode);
      document.documentElement.dispatchEvent(new CustomEvent('reset'));
      document.documentElement.removeAttribute('onreset');

    
      };

      var x =document.querySelector(".IconMenu");
      if(x)
        x.appendChild(btn);
      
       
  }
  
  function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
  } 

  //creat html document with all the courses from the response
  function request(generatedToken,courseName, year){
    fetch("https://yedion.jce.ac.il/yedion/fireflyweb.aspx", {
    "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "en-US,en;q=0.9,he;q=0.8",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded",
    "pragma": "no-cache",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1"
  },
  "referrer": "https://yedion.jce.ac.il/yedion/fireflyweb.aspx",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "APPNAME=&PRGNAME=List_Of_Courses&ARGUMENTS=-N211470802%2C-N76202369069446%2C-N61%2C-A%2CR1C10%2C-N0%2C-A%D7%A0%2CR1C4&R1C2=1&R1C3=1&R1C10=&R1C11="+courseName+"&R1C4="+year+"&generatedToken="+generatedToken,
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
    })
    .then(response => response.text())
    .then(data => {
      // var newHTML = document.open("text/html", "replace");
      // newHTML.write(data);
      // newHTML.querySelector("#MyFather1 > div");  
      // newHTML.close();
      var newStuff = $.parseHTML(data);//returns an array-like?
      var actualNewDiv = newStuff[0];
      console.log('jquery parsed reference to the DOMNodes');
      console.log(actualNewDiv);//could be passed to html2canvas without querySelector-ing
      console.log('since the root element IS the div, we cant query for it');
      console.log($(newStuff).find("#MyFather1 > div"));      
    }
    );

  } 
  //creat Map<number,string> code+name from the response
  function requestAllCoursesName(generatedToken,letter,year){
    
    fetch("https://yedion.jce.ac.il/yedion/fireflyweb.aspx", {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9,he;q=0.8",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded",
        "pragma": "no-cache",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1"
      },
      "referrer": "https://yedion.jce.ac.il/yedion/fireflyweb.aspx",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": "APPNAME=&PRGNAME=LOOK_FOR_NOSE_AB_Site&ARGUMENTS=-N211470802%2C-N22735865355641%2CR1C2%2C-N61%2C-AH%2CR1C4&R1C2="+letter+"&R1C3=1&R1C10=&R1C11=&R1C4="+year+"&generatedToken="+generatedToken,
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    }) 
    .then(response => response.text())
    .then(data => {
      var newHTML = document.open("text/html", "replace");
      newHTML.write(data);
      newHTML.close();
    }
    );
  }

  fnAddButtons();
})();

