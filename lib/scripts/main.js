var workerFor = new Worker('../lib/workers/neural.js');


const getHex1 = i => ('00' + i.toString(16)).slice(-2);
function gethex(f) {
        var view = new DataView(new ArrayBuffer(4)),result;
        view.setFloat32(0, f);
        result = Array
            .apply(null, { length: 4 })
            .map((_, i) => getHex1(view.getUint8(i)))
            .join('');
        return result
}
 
function sign(x){
    if (x>0.1){
        return 10;
    }else{
        return 0;
    }
    //return 1 / ( 1 + Math.exp(-x) );
}

// listen to message event of worker
workerFor.onmessage = function(event){
    var div = document.getElementById('result');
    var div2 = document.getElementById('saniye');
    if (event.data.saniye){
        div2.innerHTML = '['+event.data['saniye']+']'
    }
    if(event.data.adim){
        div.innerHTML = '['+event.data['adim']+']'
    }
    if(event.data.matrix){
        //hello
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        w=20;

        
        matrix1=event.data['matrix']
        for (var i=0; i<w; i++){ 
        for(var j=0; j<w; j++){
            //if(matrix1[i][j]==0){
             //   ctx.fillStyle = "#FFFF00";
             //   ctx.fillRect(j*5, i*5, matrix1[i][j]*7, matrix1[i][j]*7);
           // }
        ctx.fillStyle = '#'+gethex(matrix1[i][j]*10);
        ctx.fillRect(j*10, i*10, 10, 10);
        //ctx.fillRect(j*10, i*10, sign(Math.round(matrix1[i][j]*10)), sign(Math.round(matrix1[i][j]*10)));
        }
        }   
    }
    
    
};
// listen to error event of worker
workerFor.onerror = function(event) {
    console.error('error received from workerFor => ', event);
    var div = document.getElementById('result');
    div.innerHTML = 'Error!';
};
// load results from web worker
function loadResult() {
    // add loading text until `message` event listener replaces it
    var div = document.getElementById('result');
    div.innerHTML = 'train ediliyor...';
    // emit message event to worker
    //workerFor.postMessage(null);
    act=document.querySelector('input[name="act"]:checked').value;
    r=document.querySelector('#learningRate').value;
    it=document.querySelector('#iterasyon').value;
    workerFor.postMessage({yuz: self.yuz, af: act, rate: r, it: it}); // we don't need payload here
};