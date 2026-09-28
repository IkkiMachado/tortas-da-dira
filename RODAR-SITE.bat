@echo off
title Tortas da Dira - Metodo Site Premium
echo ====================================================================
echo               TORTAS DA DIRA - CONFEITARIA ARTESANAL
echo                  Metodo Site Premium (LRGZ)
echo ====================================================================
echo.
echo Abrindo o site no seu navegador padrao...
start "" "%~dp0index.html"
echo.
echo [OK] O site ja foi aberto no seu navegador!
echo.
echo Se desejar rodar atraves de um servidor local (http://localhost:8000),
echo pressione qualquer tecla abaixo. Caso contrario, pode fechar esta janela.
echo ====================================================================
pause >nul

echo Iniciando servidor local na porta 8000...
start http://localhost:8000
python -m http.server 8000 --directory "%~dp0"
pause
