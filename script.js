function run(str) {
    if(str.trim() == "") return;

    var pstr = parse(str);
    var vs = getVariables(pstr);
    var bss = [];
    for(var i = 0; i < Math.pow(2, vs.length); i++) {
        var bs = [];
        for(var j = vs.length - 1; j >= 0; j--) bs.push((i >> j) & 1);
        bs.push(solve(pstr, vs, bs));
        bss.push(bs);
    }
    print(str, vs, bss);
}

function parse(str) {
    //AND
    str = str.split('*').join('&');
    //OR
    str = str.split('+').join('|');
    //NEGATION
    var i = str.indexOf('\'');
    while(i != -1) {
        var l = 0;
        for(var j = i - 1; j >= 0; j--) {
            var c = str.charAt(j);
            if((c == '&' || c == '|' || j == 0) && l == 0) {
                str = str.slice(0, i) + str.slice(i + 1);
                if(j == 0) str = str.slice(0, j) + '!' + str.slice(j);
                else str = str.slice(0, j + 1) + '!' + str.slice(j + 1);
                break;
            }
            if(c == ')') l++;
            if(c == '(') {
                l--;
                if(l <= 0) {
                    str = str.slice(0, i) + str.slice(i + 1);
                    if(l == 0) str = str.slice(0, j) + '!' + str.slice(j);
                    else str = str.slice(0, j + 1) + '!' + str.slice(j + 1);
                    break;
                }
            }
        }
        i = str.indexOf('\'');
    }
    return str;
}

function getVariables(str) {
    var vs = [];
    var r = str.split('!').join(',').split('&').join(',').split('|').join(',').split('(').join(',').split(')').join(',').split(',');
    for(var i = 0; i < r.length; i++) {
        var v = r[i];
        if(v != "" && vs.indexOf(v) == -1 && isNaN(v)) vs.push(v);
    }
    return vs.sort();
}

function solve(str, vs, bs) {
    for(var i = 0; i < vs.length; i++) {
        str = str.split(vs[i]).join(bs[i]);
    }
    return eval(str) ? 1 : 0;
}

function print(str, vs, bss) {
    var fstr = "";
    for(var i = 0; i < vs.length; i++) {
        fstr += vs[i] + "\t";
    }
    fstr += str + "\n";
    for(var i = 0; i < Math.pow(2, vs.length); i++) {
        for(var j = 0; j < vs.length + 1; j++) {
            fstr += bss[i][j] + (j < vs.length ? "\t" : "\n");
        }
    }
    document.getElementById("output").innerHTML = fstr;
}
