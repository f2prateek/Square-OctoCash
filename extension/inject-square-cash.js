/*
* Copyright 2013 Prateek Srivastava (@f2prateek)
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

var _GITHUB_PROFILE_REGEX = 'http(?:s)?:\/\/github.com\/([^\/]+)';
var _MAILTO_TEMPLATE = '<span class="octicon octicon-beer"></span><a class="email" href="mailto:$EMAIL?subject=$10&amp;cc=cash@square.com">Sponsor $USERNAME!</a>';

(function() {
    var url = window.location.href;
    var appendContent;
    
    var username;
    var email;
    
    var m;
    // Check if at a profile page
    if(m = url.match(_GITHUB_PROFILE_REGEX)) {
        // Node containg the info about user
        var details_node =  document
        .getElementsByClassName('vcard-details')[0];
        
        // Node displaying user's email
        var email_node = findEmailNode(details_node);
        
        // Grab the info we need
        email = email_node.attributes[2].nodeValue;
        username = m[1];
        
        appendContent = _MAILTO_TEMPLATE.replace('$EMAIL', email).replace('$USERNAME', username);
    }
    
    // Write the link
    if(appendContent){
        var appendNode = document.createElement('li');
        appendNode.classList.add('vcard-detail');
        appendNode.innerHTML = appendContent;
        details_node.appendChild(appendNode);
    }
    
})();

// Given a node with all details, find one that contains the email
function findEmailNode(details_node) {
    var children = details_node.getElementsByTagName('li');
    for(var i=0; i<children.length; i++) {
        var potentials = children[i].getElementsByTagName('a');
        for(var j=0; j<potentials.length; j++) {
            if(potentials[j].classList.contains('email')) {
                return potentials[j];
            }
        }
    }
}