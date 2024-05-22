*** Settings ***
Library           RequestsLibrary
Library           Collections

*** Variables ***
${BASE_URL}       http://localhost:3000
${ID}             001

*** Test Cases ***
Test Eliminar Cita Existente
    [Documentation]    Prueba la eliminación de una cita existente
    [Tags]              eliminar_cita
    Create Session     cita_session    ${BASE_URL}
    ${headers}=        Create Dictionary    Content-Type=application/json
    ${response}=       Delete Request    cita_session    /citas/${ID}    headers=${headers}
    Should Be Equal As Strings    ${response.status_code}    200
    ${response_data}=  Convert To Dictionary    ${response.content}
    Should Not Be Equal    ${response_data}    ${None}
    Should Contain     ${response_data}[message]    Cita eliminada

Test Eliminar Cita No Existente
    [Documentation]    Prueba la eliminación de una cita que no existe
    [Tags]              eliminar_cita
    Create Session     cita_session    ${BASE_URL}
    ${headers}=        Create Dictionary    Content-Type=application/json
    ${non_existent_id}=    Evaluate    "123456789012345678901234"
    ${response}=       Delete Request    cita_session    /citas/${non_existent_id}    headers=${headers}
    Should Be Equal As Strings    ${response.status_code}    404
    ${response_data}=  Convert To Dictionary    ${response.content}
    Should Not Be Equal    ${response_data}    ${None}
    Should Contain     ${response_data}[message]    Cita no encontrada
