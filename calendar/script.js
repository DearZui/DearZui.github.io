/**
 * Created by PC on 2016/4/8.
 */
var hld = new Array(
    "0101 元旦",
    "0214 情人节",
    "0308 妇女节",
    "0312 植树节",
    "0315 消费者权益日",
    "0401 愚人节",
    "0501 劳动节",
    "0601 儿童节",
    "0910 教师节",
    "1001 国庆节",
    "1224 平安夜",
    "1225 圣诞节");
    var solarTerm = new Array('0105小寒','0120大寒','0203立春','0218雨水','0305惊蜇','0320春分','0404清明','0419谷雨','0505立夏','0520小满','0605芒种','0621夏至','0706小暑','0722大暑','0807立秋','0822处暑','0907白露','0922秋分','1008寒露','1023霜降','1107立冬','1122小雪','1206大雪','1221冬至');
window.onload = function() {
    var d = new Date();
    month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var month = d.getMonth(), month_select;  //0-11
    var year = d.getFullYear(), year_select;

    for(year_select = 1900; year_select <2101; year_select++){
        if(year_select == year){
            document.getElementById("calendar-year").innerHTML += "<OPTION VALUE='"+year_select+"' SELECTED>"+year_select+"</OPTION>";
        }
        else{
            document.getElementById("calendar-year").innerHTML += "<OPTION VALUE='"+year_select+"'>"+year_select+"</OPTION>";
        }
    }

    for(month_select = 0; month_select < 12; month_select++){
        if(month_select == month){
            document.getElementById("calendar-month").innerHTML += "<OPTION VALUE='"+month_select+"' SELECTED>"+month_name[month_select]+"</OPTION>";
        }
        else{
            document.getElementById("calendar-month").innerHTML += "<OPTION VALUE='"+month_select+"'>"+month_name[month_select]+"</OPTION>";
        }
    }

    var month_index = document.getElementById("calendar-month").selectedIndex;
    var month_selected = parseInt(document.getElementById("calendar-month").options[month_index].value);
    var year_index = document.getElementById("calendar-year").selectedIndex;
    var year_selected = parseInt(document.getElementById("calendar-year").options[year_index].value);

    var first_date = month_name[month_selected] + " " + 1 + " " + year_selected;
    var tmp = new Date(first_date).toDateString();
    var first_day = tmp.substring(0, 3);
    var day_name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var day_no = day_name.indexOf(first_day);  //1
    var days = new Date(year_selected, month_selected+1, 0).getDate();  //30

    var calendar = get_calendar(day_no, days);
    document.getElementById("calendar-dates").appendChild(calendar);

}

function changeView(){
    document.getElementById("calendar-dates").innerHTML = "";
    var month_index = document.getElementById("calendar-month").selectedIndex;
    var month_selected = parseInt(document.getElementById("calendar-month").options[month_index].value);
    var year_index = document.getElementById("calendar-year").selectedIndex;
    var year_selected = parseInt(document.getElementById("calendar-year").options[year_index].value);

    var first_date = month_name[month_selected] + " " + 1 + " " + year_selected;
    var tmp = new Date(first_date).toDateString();
    var first_day = tmp.substring(0, 3);
    var day_name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var day_no = day_name.indexOf(first_day);  //1
    var days = new Date(year_selected, month_selected+1, 0).getDate();  //30
    var calendar = get_calendar(day_no, days);
    document.getElementById("calendar-dates").appendChild(calendar);
}

function get_calendar(day_no, days){
    var table = document.createElement('table');
    var tr = document.createElement('tr');

    for(var c = 0; c <= 6; c++){
        var td = document.createElement('td');
        td.innerHTML = "SMTWTFS"[c];
        tr.appendChild(td);
    }
    table.appendChild(tr);

    //2nd row
    tr = document.createElement('tr');
    var c;
    for(c = 0; c <= 6; c++){
        if(c == day_no){
            break;
        }
        var td = document.createElement('td');
        td.innerHTML = "";
        tr.appendChild(td);
    }

    var count = 1;
    for(; c <= 6; c++){
        var td = document.createElement('td');
        td.innerHTML = count;
        var month_index = document.getElementById("calendar-month").selectedIndex;
        var month_selected = parseInt(document.getElementById("calendar-month").options[month_index].value);
        setHoliday(month_selected+1,count,td);
        setSolar(month_selected+1,count,td);
        count++;
        tr.appendChild(td);
    }
    table.appendChild(tr);

    //rest
    for(var r = 3; r <= 7; r++){
        tr = document.createElement('tr');
        for(var c = 0; c <= 6; c++){
            if(count > days){
                table.appendChild(tr);
                return table;
            }
            var td = document.createElement('td');
            td.innerHTML = count;
            var month_index = document.getElementById("calendar-month").selectedIndex;
            var month_selected = parseInt(document.getElementById("calendar-month").options[month_index].value);
            setHoliday(month_selected+1,count,td);
            setSolar(month_selected+1,count,td);
            count++;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}

function setHoliday(month,day,td){
    for(var i = 0; i < hld.length; i++){
        if(parseInt(hld[i].substr(0,2)) == month){
            if(parseInt(hld[i].substr(2,4)) == day){
                td.innerHTML += "<br/>" + hld[i].substr(5);
            }
        }
    }
}


function setSolar(m,d,td){
    for(var i = 0; i < solarTerm.length; i++){
        if(parseInt(solarTerm[i].substr(0,2)) == m){
            if(parseInt(solarTerm[i].substr(2,4)) == d){
                td.innerHTML += "<br/>" + solarTerm[i].substr(4);
            }
        }
    }
}