*** Settings ***
Library    RequestsLibrary
Library    Collections

*** Variables ***
${BASE_URL}             http://localhost:3000/medicos

*** Test Cases ***
Eliminar Médico Existente
    [Documentation]    Eliminar un médico existente por su ID
    ${response}=    Delete Request    ${BASE_URL}/001
    Should Be Equal As Strings    ${response.status_code}    200
    ${response_json}=    To JSON    ${response.content}
    Should Be Equal As Strings    ${response_json["message"]}    Médico eliminado

Eliminar Médico Inexistente
    [Documentation]    Intentar eliminar un médico inexistente por su ID
    ${response}=    Delete Request    ${BASE_URL}/123123123123
    Should Be Equal As Strings    ${response.status_code}    404
    ${response_json}=    To JSON    ${response.content}
    Should Be Equal As Strings    ${response_json["message"]}    Médico no encontrado

*** Keywords ***
Delete Request
    [Arguments]    ${url}
    Create Session    medico_session    ${url}
    ${response}=    Delete Request    medico_session    ${url}
    [Return]    ${response}
