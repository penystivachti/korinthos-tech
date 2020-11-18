function startTime() {
    var today = new Date();
    var day = today.getDay();
    var h = today.getHours();
    var m = today.getMinutes();
   
    m = checkTime(m);
    
   // document.getElementById('txt').innerHTML =      day + "  " + h + ":" + m ;
    var t = setTimeout(startTime, 500);
    var wra ="";
    wra = formatText(DidaktikhWra(h,m));
    document.getElementById('wra-math').innerHTML = "Είναι "+ changeDay(day)  +" και " + wra ;
    markLesson( day,DidaktikhWra(h,m));

  }
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }
  function changeDay(day){
      var nday = "";
      switch (day) {
      case 0:
          nday = "Κυριακή";
          break;
      case 1:
          nday = "Δευτέρα";
          break;
      case 2:
      nday = "Τρίτη";
          break;
      case 3:
      nday = "Τετάρτη";
          break;
      case 4:
      nday = "Πέμπτη";
          break;
      case 5:
      nday = "Παρασκευή";
          break;
      case  6:
      nday = "Σάββατο";
      }
      return nday;
  }
  function formatText(w){
      var text = "";
      if (w>0){
          text = "Bρίσκεσαι στην "+w+"η ώρα";
      }else if(w==0){
          text = "ΕΧΕΙΣ ΔΙΑΛΕΙΜΜΑ!!!";
      }else{
          text = "ΔΕΝ ΕΧΕΙΣ ΜΑΘΗΜΑ!!";
         // document.getElementById("schedule").display("none");
      }
      return text;
  }
  function DidaktikhWra(h,m){
     
      if(h==14){
          if(m>10 && m<=40 ){
              wra =1 ;
          }
          else if(m>50){
              wra =2;
          }else{
              wra=0;
          }
          return wra;
      }else if(h==15){
          if(m<=20 ){
              wra =2;
          }
          else if(m>30){
              wra =3;
          }else{
              wra=0;
          }
      }else if(h==16){
          if(m==0 ){
              wra =3;
          }
          else if(m>10 && m<=40){
              wra =4;
          }
          else if(m>50){
              wra =5;
          }else{
              wra=0;
          }
      }else if(h==17){
          if(m<20){
              wra =5;
          }else{
              wra=0;
          }
      }else{
          wra = -1;
      }

      return wra;
      }



      function markLesson(mera,didwra){
          mera+=1;
          if (didwra > 0 ){
          didwra+=1;
          //var allTableCells = document.getElementsByTagName("td");
          var allTableRows = document.getElementsByTagName("tr");
          for(var i = 0, max = allTableRows.length; i < max; i++) {
              
          var rows = allTableRows[i];
          
              if(i==didwra){
                var TableCells = rows.getElementsByTagName("td");
                for(var x = 0, max = TableCells.length; x < max; x++) {
                 // rows.style.backgroundColor = "red";
                  if(x==mera){
                      TableCells[x].style.backgroundColor = "blue";
                      TableCells[x].className ="blink";
                  }
                  
                }
               
              } 
          }
          }
      }
  
