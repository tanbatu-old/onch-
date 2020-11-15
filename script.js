let message
let msg = []
let time
let speed = 1000;
let sec = -1
let resn = 0
let rest = true;
let itti
$(function(){

    $.ajaxSetup({
        beforeSend: function(xhr){
            xhr.overrideMimeType("text/html;charset=Shift_JIS");
        }
    });
    $("#button").click(function() {
        const str1 = $('#a').val();
        document.getElementById('button').remove();
        let str2 = str1.slice(0,65).replace('test/read.cgi/livejupiter','livejupiter/dat')
        str2 += '.dat'
        window.open(str2, '_blank')
        document.querySelector('#a').insertAdjacentHTML('afterend','<textarea style="margin-top:5%;height:150px" placeholder="ここに選択したコードをコピー" id=b></textarea><br><input type="button" id=button1 value="開始" onclick="start()">')
    });

})

function stop(){
    if(rest == true){
        rest = false
    }else {
        rest = true
        read()
    };
}

function start(){
    const data = $('#b').val();
    document.getElementById('button1').remove();
    let be = data.split('\n')
    for(i=0;i<be.length-1;i++){
        message = be[i].split('<>')
        clock = message[2].slice(-15,-7).split(":")
        time=message[2].slice(-9,-7) 
        msg.push({date:message[2],name:message[0],num:clock,sec:time,msg:message[3]}) 
    }
    itti = msg[0].date.slice(-3)
    hour = Number(msg[0].num[0])
    min = Number(msg[0].num[1])
    sec = Number(msg[0].num[2])-1
    read()
    document.querySelector('#form').remove()
    document.querySelector('#setu').remove()
    document.getElementById('cnsl').style.display = "block";
    document.getElementById('console').style.display = "flex";
}
function skip(){
    hour = msg[resn].num[0]
    min = msg[resn].num[1]
    sec = msg[resn].num[2]-1
    document.getElementById('snum').innerText = ("00"+(hour).toString()).slice(-2)+":"+(min.toString()).slice(-2)+":"+("00"+(sec).toString()).slice(-2);

}
function read(){
    if(rest==true){
        window.setTimeout(read,speed)
        sec++
        if(sec==60){
            sec-=60
            min++
            if(min==60){
                min=0
                hour++
                if(hour==25){
                    hour=0
                }
            }
        }
        if((msg[resn].num[0].toString())+":"+(msg[resn].num[1].toString())+":"+(msg[resn].num[2].toString()) == ("00"+(hour).toString()).slice(-2)+":"+(min.toString()).slice(-2)+":"+("00"+(sec).toString()).slice(-2)){
            resn++
            write()


        }

        document.getElementById('snum').innerText = ("00"+(hour).toString()).slice(-2)+":"+(min.toString()).slice(-2)+":"+("00"+(sec).toString()).slice(-2);
        }
    
}

function write(){
    const ms = document.querySelector('.message').outerHTML
    document.getElementById('den').insertAdjacentHTML('afterbegin',ms)
    document.querySelector('.message').id = resn
    document.querySelector('.rnum').innerText=resn
    document.querySelector('.date').innerText=msg[resn-1].date
    if(msg[resn-1].date.slice(-3) == itti){
        document.querySelector('.date').insertAdjacentHTML('afterbegin','<span style="color:red">主</span>')
    }
    document.querySelector('.name').innerText=msg[resn-1].name
    document.querySelector('.msg').innerHTML='<p>'+msg[resn-1].msg+'</p>'
    if((msg[resn].num[0].toString())+":"+(msg[resn].num[1].toString())+":"+(msg[resn].num[2].toString()) == ("00"+(hour).toString()).slice(-2)+":"+(min.toString()).slice(-2)+":"+("00"+(sec).toString()).slice(-2)){
        resn++
        write();
    }
}

document.getElementById('button').onclick = function(){
    console.log()
} 
 /* #read_text のテキストを data に変更 */
 
 