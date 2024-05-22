*** Settings ***
Library           RequestsLibrary
Library           Collections
Library    BuiltIn

*** Variables ***
${BASE_URL}       http://localhost:3000
${URL}       PedirCita?id=664549a1581e9312408f782d
${NOMBRE}           Alexis Sanchez
${FECHA}              12345678-9
${Hora}  15:54
${CORREO DEL PACIENTE}           Alexis_Sanchez

*** Test Cases ***
Test Crear Cita Exitosa
    [Documentation]    Prueba la creación de una cita exitosa
    [Tags]              crear_cita
    Open Browser    ${BASE_URL}    chrome    options=add_argument("--ignore-certificate-errors")
    Go To              ${BASE_URL}/${URL}
    ${headers}=        Create Dictionary    Content-Type=application/json
    ${payload}=        Create Dictionary    paciente=Pablo Arellano    especialista_id=663e9659eaad88dfdcd4aa56    fecha=2024-05-10    hora=11:00    correo_paciente=iglesias002@gmail.com
    ${response}=       POST On Session   cita_session    /${URL}     headers=${headers}    json=${payload}
    Should Be Equal As Strings    ${response.status_code}    200
    ${response_data}=  Convert To Dictionary    ${response.content}
    Should Not Be Equal    ${response_data}    ${None}
    Should Contain     ${response_data}[message]    Creación exitosa de cita

Test Crear Cita con Conflicto
    [Documentation]    Prueba la creación de una cita con conflicto de horarios
    [Tags]              crear_cita
    Create Session     cita_session    ${BASE_URL}
    ${headers}=        Create Dictionary    Content-Type=application/json
    ${payload}=        Create Dictionary    paciente=Pablo Arellano    especialista_id=663e9659eaad88dfdcd4aa56    fecha=2024-05-10    hora=11:00    correo_paciente=iglesias002@gmail.com
    ${response}=       POST On Session    cita_session    /${URL}     headers=${headers}    json=${payload}
    Should Be Equal As Strings    ${response.status_code}    409
    ${response_data}=  Convert To Dictionary    ${response.content}
    Should Not Be Equal    ${response_data}    ${None}
    Should Contain     ${response_data}[message]    El especialista ya tiene una cita en ese horario
