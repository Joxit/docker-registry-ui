<!--
Copyright (C) 2016-2018 Jones Magloire @Joxit

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
-->
<tag-history>
    <material-card ref="tag-history-tag" class="tag-history">
        <div class="material-card-title-action">
            <h2>History of { registryUI.taghistory.image }:{ registryUI.taghistory.tag }</h2>
        </div>
        <div hide="{ registryUI.taghistory.loadend }" class="spinner-wrapper">
            <material-spinner></material-spinner>
        </div>

        <table show="{ registryUI.taghistory.loadend }" style="border: none;">
            <thead>
            <tr>
                <th class="material-card-th-left">One</th>
                <th>Two</th>
                <th>Three</th>
            </tr>
            </thead>
            <tbody>
            <tr each="{ historyelement in registryUI.taghistory.elements }">
                <td class="material-card-th-left">
                    { historyelement.v1Compatibility }
                </td>
                <td class="copy-to-clipboard">
                </td>
                <td>

                </td>
            </tr>
            </tbody>
        </table>

    </material-card>

    <script>
        console.log("taghistory script area");

        registryUI.taghistory.instance = this;
        registryUI.taghistory.display = function () {
            var oReq = new Http();
            registryUI.taghistory.instance.update();
            oReq.addEventListener('load', function () {
                console.log("taghistory addEventListener::load");
                registryUI.taghistory.elements = [];
                if (this.status == 200) {
                    var history = JSON.parse(this.responseText).history || [];

                    for(historyElement in history){
                        historyElement
                    }

                } else if (this.status == 404) {
                    registryUI.snackbar('Manifest could not be fetched', true);
                } else {
                    registryUI.snackbar(this.responseText);
                }
            });
            oReq.addEventListener('error', function () {
                registryUI.snackbar(this.getErrorMessage(), true);
                registryUI.taghistory.elements = [];
            });
            oReq.addEventListener('loadend', function () {
                registryUI.taghistory.loadend = true;
                registryUI.taghistory.instance.update();
            });
            console.log("Trying to create GET call with image='" + registryUI.taghistory.image + "' and tag='" + registryUI.taghistory.tag + "'")
            oReq.open('GET', registryUI.url() + '/v2/' + registryUI.taghistory.image + '/manifests/' + registryUI.taghistory.tag);
            oReq.send();
        };

        registryUI.taghistory.display();
        registryUI.taghistory.instance.update();
    </script>
</tag-history>