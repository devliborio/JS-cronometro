(function () {
    // Referencias HTML
    var $cronometro = document.querySelector('#cronometro');
    var $iniciar = document.querySelector('#iniciar');
    var $pausar = document.querySelector('#pausar');
    var $reset = document.querySelector('#resetar');

    // Outras Variaveis
    var tsClickIniciar = 0;
    var tsClickPausar = 0;
    var tsTempoDecorrido = 0;
    var intervalo = null;
    var rodando = false;

    // Eventos
    $iniciar.addEventListener('click', comecaCrono);
    $pausar.addEventListener('click', pausaCrono);
    $reset.addEventListener('click', resetaCrono);


    // Funções
    function comecaCrono() {
        if(rodando) {return}
        resetaCrono();
        tsClickIniciar = Date.now();
        iniciar();
        rodando = true;
    }

    function iniciar(tempoDecorrido) {
        var _ms = tempoDecorrido || 0;
        intervalo = setInterval(function () {
            var tsAgora = Date.now();
            var diferenca = tsAgora - tsClickIniciar;
            $cronometro.value = formataTs(diferenca + _ms);
        }, 10);
    }

    function pausaCrono() {
        if(!$cronometro.value) {return}
        if (rodando) {
            clearInterval(intervalo);
            tsClickPausar = Date.now();
            tsTempoDecorrido += (tsClickPausar - tsClickIniciar);
        } else {
            tsClickIniciar = Date.now()
            iniciar(tsTempoDecorrido);
        }
        rodando = !rodando;
    }

    function resetaCrono() {
        tsClickIniciar = 0;
        tsClickPausar = 0;
        tsTempoDecorrido = 0;
        rodando = false;
        $cronometro.value = null;
        clearInterval(intervalo)
    }

    function formataTs(ms) { // ms = 30500
        /*
            ms = 900 => 900ms
            ms = 1000 => 1s:500ms
            ms = 59000 => 59s:000ms
            ms = 61500 => 1m:1s:500ms
        */

        const MINUTO = 60 * 1000; // 60000 = 1 minuto

        if (ms < 1000) {
            return ms;
        } else if (ms < MINUTO) {
            var s = ms / 1000;       // s = 30500 / 1000 = 30.5segundos
            s = parseInt(s);         // 30segundos
            var c = ms - (s * 1000); // c = 30500 - (30 * 1000) = 500centesimos
            return s + '.' + c;      // 30s:500c
        } else {
            var m = ms / MINUTO;            // 60000 / 60000 = 1min
            m = parseInt(m);               // 1min
            return m + ':' + formataTs(ms - m * MINUTO); // Chamando função recursiva.
        }
    }
})()
 