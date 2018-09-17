webpackJsonp([2],{2614:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(2),s=n(17),r=n(47),a=n(35),o=n(2623),d=n(401),c=n(2618),l=n(2620),u=n(2619),p=n(869),y=n(868),f=n(265),v=function(){function e(){}return e=__decorate([i.NgModule({imports:[s.CommonModule,r.FormsModule,a.NgbModule,d.FileImporterModule,o.IdentityRoutingModule,y.FooterModule,f.DrawerModule,p.IdentityCardModule],entryComponents:[c.IdentityIssuedComponent,l.IssueIdentityComponent],declarations:[c.IdentityIssuedComponent,l.IssueIdentityComponent,u.IdentityComponent],providers:[],exports:[]})],e)}();t.IdentityModule=v},2617:function(e,t,n){var i,s=s||function(e){"use strict";if(!(void 0===e||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var t=e.document,n=function(){return e.URL||e.webkitURL||e},i=t.createElementNS("http://www.w3.org/1999/xhtml","a"),s="download"in i,r=function(e){var t=new MouseEvent("click");e.dispatchEvent(t)},a=/constructor/i.test(e.HTMLElement)||e.safari,o=/CriOS\/[\d]+/.test(navigator.userAgent),d=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},c="application/octet-stream",l=4e4,u=function(e){var t=function(){"string"==typeof e?n().revokeObjectURL(e):e.remove()};setTimeout(t,l)},p=function(e,t,n){t=[].concat(t);for(var i=t.length;i--;){var s=e["on"+t[i]];if("function"==typeof s)try{s.call(e,n||e)}catch(e){d(e)}}},y=function(e){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob([String.fromCharCode(65279),e],{type:e.type}):e},f=function(t,d,l){l||(t=y(t));var f,v=this,m=t.type,h=m===c,g=function(){p(v,"writestart progress write writeend".split(" "))},I=function(){if((o||h&&a)&&e.FileReader){var i=new FileReader;return i.onloadend=function(){var t=o?i.result:i.result.replace(/^data:[^;]*;/,"data:attachment/file;");e.open(t,"_blank")||(e.location.href=t),t=void 0,v.readyState=v.DONE,g()},i.readAsDataURL(t),void(v.readyState=v.INIT)}if(f||(f=n().createObjectURL(t)),h)e.location.href=f;else{e.open(f,"_blank")||(e.location.href=f)}v.readyState=v.DONE,g(),u(f)};if(v.readyState=v.INIT,s)return f=n().createObjectURL(t),void setTimeout(function(){i.href=f,i.download=d,r(i),g(),u(f),v.readyState=v.DONE});I()},v=f.prototype,m=function(e,t,n){return new f(e,t||e.name||"download",n)};return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(e,t,n){return t=t||e.name||"download",n||(e=y(e)),navigator.msSaveOrOpenBlob(e,t)}:(v.abort=function(){},v.readyState=v.INIT=0,v.WRITING=1,v.DONE=2,v.error=v.onwritestart=v.onprogress=v.onwrite=v.onabort=v.onerror=v.onwriteend=null,m)}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);void 0!==e&&e.exports?e.exports.saveAs=s:null!==n(2621)&&null!==n(870)&&void 0!==(i=function(){return s}.call(t,n,t,e))&&(e.exports=i)},2618:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(2),s=n(35),r=n(135),a=n(3),o=function(){function e(e,t){this.activeModal=e,this.identityCardService=t,this.cardName=null,this.cardNameValid=!0}return e.prototype.ngOnInit=function(){var e=this.identityCardService.getCurrentIdentityCard(),t=e.getConnectionProfile(),n=e.getBusinessNetworkName(),i={version:1,userName:this.userID,enrollmentSecret:this.userSecret,businessNetwork:n};this.newCardRef=this.identityCardService.currentCard,this.newCard=new a.IdCard(i,t),this.newIdentity=this.userID+"\n"+this.userSecret},e.prototype.addToWallet=function(){var e=this;return this.identityCardService.addIdentityCard(this.newCard,this.cardName).then(function(t){e.activeModal.close({choice:"add",cardRef:t})}).catch(function(t){t.message.startsWith("Card already exists: ")?e.cardNameValid=!1:e.activeModal.dismiss(t)})},e.prototype.export=function(){this.activeModal.close({choice:"export",card:this.newCard})},e.prototype.setCardName=function(e){this.cardName!==e&&(this.cardName=e,this.cardNameValid=!0)},__decorate([i.Input(),__metadata("design:type",String)],e.prototype,"userID",void 0),__decorate([i.Input(),__metadata("design:type",String)],e.prototype,"userSecret",void 0),e=__decorate([i.Component({selector:"identity-issued-modal",template:n(2628),styles:[n(2631).toString()]}),__metadata("design:paramtypes",[s.NgbActiveModal,r.IdentityCardService])],e)}();t.IdentityIssuedComponent=o},2619:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(2),s=n(35),r=n(402),a=n(2624),o=n(2622),d=n(56),c=n(77),l=n(135),u=n(2617),p=function(){function e(e,t,n,i){this.modalService=e,this.alertService=t,this.clientService=n,this.identityCardService=i,this.currentIdentity=null,this.participants=new Map}return e.prototype.ngOnInit=function(){return this.loadAllIdentities()},e.prototype.loadAllIdentities=function(){var e=this;return this.clientService.ensureConnected().then(function(){return e.loadParticipants()}).then(function(){return e.businessNetworkName=e.clientService.getBusinessNetwork().getName(),e.clientService.getBusinessNetworkConnection().getIdentityRegistry()}).then(function(e){return e.getAll()}).then(function(t){var n=e.identityCardService.getCurrentIdentityCard().getConnectionProfile(),i=e.identityCardService.getQualifiedProfileName(n);t.sort(function(e,t){return e.name.localeCompare(t.name)}),t.filter(function(t){t.ref=e.identityCardService.getCardRefFromIdentity(t.name,e.businessNetworkName,i)}),t.forEach(function(n,i){"NetworkAdmin"!==n.participant.getType()&&"REVOKED"!==t[i].state&&(e.getParticipant(n.participant.getNamespace()+"."+n.participant.getType()+"#"+n.participant.getIdentifier())||(t[i].state="BOUND PARTICIPANT NOT FOUND"))}),e.allIdentities=t}).then(function(){return e.loadMyIdentities()}).catch(function(t){e.alertService.errorStatus$.next(t)})},e.prototype.loadMyIdentities=function(){var e=this;this.currentIdentity=this.identityCardService.currentCard;var t=this.identityCardService.getCurrentIdentityCard().getBusinessNetworkName(),n=this.identityCardService.getCurrentIdentityCard().getConnectionProfile(),i=this.identityCardService.getQualifiedProfileName(n);this.identityCards=this.identityCardService.getAllCardsForBusinessNetwork(t,i);var s=Array.from(this.identityCards.keys());this.myIDs=s.map(function(t){var n=e.allIdentities.find(function(e){return e.ref===t});return{ref:t,usable:"BOUND PARTICIPANT NOT FOUND"!==n.state&&"REVOKED"!==n.state}}).sort(function(e,t){return e.ref.localeCompare(t.ref)})},e.prototype.issueNewId=function(){var e=this,t=this.modalService.open(a.IssueIdentityComponent);return t.componentInstance.participants=this.participants,t.result.then(function(t){if(t){return"web"===e.identityCardService.getCurrentIdentityCard().getConnectionProfile()["x-type"]?e.addIdentityToWallet(t):e.showNewId(t)}}).catch(function(t){t&&t!==s.ModalDismissReasons.BACKDROP_CLICK&&t!==s.ModalDismissReasons.ESC&&e.alertService.errorStatus$.next(t)}).then(function(){return e.loadAllIdentities()}).catch(function(t){e.alertService.errorStatus$.next(t)})},e.prototype.setCurrentIdentity=function(e,t){var n=this,i=e.ref;if(this.currentIdentity===i||!e.usable)return Promise.resolve();this.currentIdentity;this.identityCardService.setCurrentIdentityCard(i).then(function(){return n.currentIdentity=i,n.alertService.busyStatus$.next({title:"Reconnecting...",text:"Using identity "+n.currentIdentity}),n.clientService.ensureConnected(!0)}).then(function(){return n.alertService.busyStatus$.next(null),n.loadAllIdentities()}).catch(function(e){n.alertService.busyStatus$.next(null),n.alertService.errorStatus$.next(e),t&&n.setCurrentIdentity({ref:n.currentIdentity,usable:!0},!1)})},e.prototype.openRemoveModal=function(e){var t=this,n=this.identityCards.get(e).getUserName(),i=this.modalService.open(r.DeleteComponent);return i.componentInstance.headerMessage="Remove ID",i.componentInstance.fileAction="remove",i.componentInstance.fileType="ID",i.componentInstance.fileName=n,i.componentInstance.deleteMessage="Take care when removing IDs: you usually cannot re-add them. Make sure you leave at least one ID that can be used to issue new IDs.",i.componentInstance.confirmButtonText="Remove",i.result.then(function(){return t.alertService.busyStatus$.next({title:"Removing ID",text:"Removing identity "+n+" from your wallet"}),t.removeIdentity(e)},function(e){e&&e!==s.ModalDismissReasons.BACKDROP_CLICK&&e!==s.ModalDismissReasons.ESC&&(t.alertService.busyStatus$.next(null),t.alertService.errorStatus$.next(e))})},e.prototype.revokeIdentity=function(e){var t=this,n=this.modalService.open(r.DeleteComponent);return n.componentInstance.headerMessage="Revoke Identity",n.componentInstance.fileType="identity",n.componentInstance.fileName=e.name,n.componentInstance.deleteMessage="Are you sure you want to do this?",n.componentInstance.confirmButtonText="Revoke",n.componentInstance.action="revoke",n.result.then(function(){return t.alertService.busyStatus$.next({title:"Revoking identity within business network",text:"Revoking identity "+e.name}),t.clientService.revokeIdentity(e).then(function(){if(t.myIDs.find(function(t){return e.ref===t.ref}))return t.removeIdentity(e.ref)}).then(function(){return t.loadAllIdentities()}).then(function(){t.alertService.busyStatus$.next(null),t.alertService.successStatus$.next({title:"Revoke Successful",text:e.name+" was successfully revoked.",icon:"#icon-bin_icon"})}).catch(function(e){t.alertService.busyStatus$.next(null),t.alertService.errorStatus$.next(e)})},function(e){e&&e!==s.ModalDismissReasons.BACKDROP_CLICK&&e!==s.ModalDismissReasons.ESC&&(t.alertService.busyStatus$.next(null),t.alertService.errorStatus$.next(e))})},e.prototype.loadParticipants=function(){var e=this;return this.clientService.getBusinessNetworkConnection().getAllParticipantRegistries().then(function(e){return Promise.all(e.map(function(e){return e.getAll()}))}).then(function(e){return Promise.all(e.reduce(function(e,t){return e.concat(t)},[]))}).then(function(t){return Promise.all(t.map(function(t){return e.participants.set(t.getFullyQualifiedIdentifier(),t)}))}).catch(function(t){e.alertService.errorStatus$.next(t)})},e.prototype.getParticipant=function(e){return this.participants.get(e)},e.prototype.removeIdentity=function(e){var t=this,n=this.identityCards.get(e).getUserName();return this.identityCardService.deleteIdentityCard(e).then(function(){return t.loadAllIdentities()}).then(function(){t.alertService.busyStatus$.next(null),t.alertService.successStatus$.next({title:"Removal Successful",text:n+" was successfully removed.",icon:"#icon-bin_icon"})}).catch(function(e){t.alertService.busyStatus$.next(null),t.alertService.errorStatus$.next(e)})},e.prototype.showNewId=function(e){var t=this,n=this.modalService.open(o.IdentityIssuedComponent);return n.componentInstance.userID=e.userID,n.componentInstance.userSecret=e.userSecret,n.result.then(function(e){if("add"===e.choice)t.alertService.successStatus$.next({title:"ID Card added to wallet",text:"The ID card "+t.identityCardService.getIdentityCard(e.cardRef).getUserName()+" was successfully added to your wallet",icon:"#icon-role_24"});else if("export"===e.choice)return t.exportIdentity(e.card)})},e.prototype.exportIdentity=function(e){var t=e.getUserName()+".card";return e.toArchive().then(function(e){var n=new Blob([e],{type:"application/octet-stream"});return u.saveAs(n,t)})},e.prototype.addIdentityToWallet=function(e){var t=this,n=this.identityCardService.getCurrentIdentityCard(),i=n.getConnectionProfile(),s=n.getBusinessNetworkName();return this.identityCardService.createIdentityCard(e.userID,null,s,e.userSecret,i).then(function(e){t.alertService.successStatus$.next({title:"ID Card added to wallet",text:"The ID card "+t.identityCardService.getIdentityCard(e).getUserName()+" was successfully added to your wallet",icon:"#icon-role_24"})})},e=__decorate([i.Component({selector:"identity",template:n(2629),styles:[n(2632).toString()]}),__metadata("design:paramtypes",[s.NgbModal,d.AlertService,c.ClientService,l.IdentityCardService])],e)}();t.IdentityComponent=p},2620:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(2),s=n(35);n(274),n(405),n(873);var r=n(56),a=n(77),o=function(){function e(e,t,n){var i=this;this.activeModal=e,this.alertService=t,this.clientService=n,this.participants=new Map,this.issueInProgress=!1,this.userID=null,this.participantFQI=null,this.participantFQIs=[],this.issuer=!1,this.isParticipant=!0,this.noMatchingParticipant="Named Participant does not exist in Participant Registry.",this.search=function(e){return e.debounceTime(200).distinctUntilChanged().map(function(e){return""===e?[]:i.participantFQIs.filter(function(t){return new RegExp(e,"gi").test(t)}).slice(0,10)})}}return e.prototype.ngOnInit=function(){return this.loadParticipants()},e.prototype.loadParticipants=function(){this.participantFQIs=Array.from(this.participants.keys()).sort(function(e,t){return e.localeCompare(t)})},e.prototype.issueIdentity=function(){var e=this;this.issueInProgress=!0;var t={issuer:this.issuer,affiliation:void 0},n=this.participantFQI.startsWith("resource:")?this.participantFQI:"resource:"+this.participantFQI;this.clientService.issueIdentity(this.userID,n,t).then(function(t){e.issueInProgress=!1,e.activeModal.close(t)}).catch(function(t){e.issueInProgress=!1,e.activeModal.dismiss(t)})},e.prototype.isValidParticipant=function(){var e=this.participantFQI.startsWith("resource:")?this.participantFQI.slice(9):this.participantFQI;""===this.participantFQI||this.getParticipant(e)?this.isParticipant=!0:this.isParticipant=!1},e.prototype.getParticipant=function(e){return this.participants.get(e)},__decorate([i.Input(),__metadata("design:type",Map)],e.prototype,"participants",void 0),e=__decorate([i.Component({selector:"issue-identity-modal",template:n(2630),styles:[n(2633).toString()]}),__metadata("design:paramtypes",[s.NgbActiveModal,r.AlertService,a.ClientService])],e)}();t.IssueIdentityComponent=o},2621:function(e,t){e.exports=function(){throw new Error("define cannot be used indirect")}},2622:function(e,t,n){"use strict";function i(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),i(n(2618))},2623:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(2),s=n(136),r=n(2619),a=function(){function e(){}return e=__decorate([i.NgModule({imports:[s.RouterModule.forChild([{path:"",component:r.IdentityComponent}])],exports:[s.RouterModule]})],e)}();t.IdentityRoutingModule=a},2624:function(e,t,n){"use strict";function i(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),i(n(2620))},2625:function(e,t,n){t=e.exports=n(20)(),t.push([e.i,"identity-issued-modal .identity-issued .modal-body{display:flex;flex-direction:row;overflow-y:auto}identity-issued-modal .identity-issued .modal-body .new-card-options{position:absolute;left:291px;padding:0 16px 16px}identity-issued-modal .identity-issued .modal-body .new-card-options dl.enrollment-credentials{margin-left:16px;display:flex;flex-flow:row wrap}identity-issued-modal .identity-issued .modal-body .new-card-options dl.enrollment-credentials dd,identity-issued-modal .identity-issued .modal-body .new-card-options dl.enrollment-credentials dt{margin:0;flex:0 0 50%}identity-issued-modal .identity-issued .modal-body .new-card-options dl.enrollment-credentials dt{font-weight:700;flex:0 0 33%}identity-issued-modal .identity-issued .modal-body .new-card-options dl.enrollment-credentials dd{flex:0 0 66%}identity-issued-modal .identity-issued .modal-body .new-card-options .actions{display:flex;justify-content:flex-end;margin-bottom:16px}identity-issued-modal .identity-issued footer svg{fill:#ff5c49;vertical-align:text-top}identity-issued-modal .identity-issued footer p.footer-text{flex:1}",""])},2626:function(e,t,n){t=e.exports=n(20)(),t.push([e.i,"identity{display:flex;width:100%}identity .main-view{overflow-y:auto;display:flex;flex-direction:column}identity .main-view .network-name{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-right:16px}identity .main-view .selected-border{width:8px;margin-right:16px}identity .main-view .identity-title{display:flex;padding:8px;padding-left:0;padding-right:16px;margin-top:16px}identity .main-view .identity-title>*{font-weight:700}identity .main-view .id{flex-basis:48%}identity .main-view .cell-24{flex-basis:24%}identity .main-view .identity{background-color:#fdfdfd;box-shadow:0 2px 5px -1px #b8c1c1;margin-bottom:8px;display:flex;padding:0;padding-right:16px;height:50px;line-height:50px;cursor:default;overflow:hidden;border-radius:4px}identity .main-view .identity:hover .actions{display:block}identity .main-view .identity .selected-border--selected{background-color:#5068c2}identity .main-view .identity .actions{display:none;text-align:right}identity .main-view i{color:#19273c}identity button{box-shadow:0 2px 5px -1px #b8c1c1}identity button.secondary{border-color:#fdfdfd}",""])},2627:function(e,t,n){t=e.exports=n(20)(),t.push([e.i,"issue-identity-modal .issue-identity p{color:#8c9696}issue-identity-modal .issue-identity ngb-typeahead-window{border:1px solid rgba(0,0,0,.15);border-radius:.25rem;width:60%}issue-identity-modal .issue-identity ngb-typeahead-window button.dropdown-item{border:none;border-radius:0;padding:2px 8px;color:#19273c;overflow-x:auto}issue-identity-modal .issue-identity ngb-typeahead-window button.dropdown-item .participant-type{font-style:italic;color:#8c9696}issue-identity-modal .issue-identity ngb-typeahead-window button.dropdown-item.active{color:#19273c;background-color:#f1f3f7}issue-identity-modal .issue-identity .keyValue{display:flex}issue-identity-modal .issue-identity .keyValue .key{flex:1;font-weight:700}issue-identity-modal .issue-identity .keyValue .value{display:flex;flex:5;flex-direction:column}issue-identity-modal .issue-identity svg{vertical-align:text-top}issue-identity-modal .issue-identity footer{width:100%}issue-identity-modal .issue-identity footer .circle-path{stroke:#fdfdfd}",""])},2628:function(e,t){e.exports='\x3c!--\n Licensed under the Apache License, Version 2.0 (the "License");\n you may not use this file except in compliance with the License.\n You may obtain a copy of the License at\n\n http://www.apache.org/licenses/LICENSE-2.0\n\n Unless required by applicable law or agreed to in writing, software\n distributed under the License is distributed on an "AS IS" BASIS,\n WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n See the License for the specific language governing permissions and\n limitations under the License.\n--\x3e\n<section class="identity-issued">\n  <header class="modal-header">\n    <h1>Identity Issued</h1>\n    <button class="icon modal-exit" (click)="activeModal.dismiss()">\n      <svg class="ibm-icon" aria-hidden="true">\n       <use xlink:href="#icon-close_new"></use>\n      </svg>\n    </button>\n  </header>\n  <div class="modal-body">\n    <identity-card [identity]="newCard" [preview]="true"></identity-card>\n\n    <div class="new-card-options">\n      <ngb-accordion [closeOthers]="true" activeIds="option-1">\n          <ngb-panel id="option-1">\n            <ng-template ngbPanelTitle>\n              <svg class="bx--accordion__arrow" width="12" height="12" viewBox="0 0 8 12" fill-rule="evenodd">\n                <path d="M0 10.6L4.7 6 0 1.4 1.4 0l6.1 6-6.1 6z"></path>\n              </svg>\n              <span>Use it yourself</span>\n            </ng-template>\n            <ng-template ngbPanelContent>\n                <p>Just add the business network card to your wallet to start using the new identity yourself</p>\n                <label for="cardName"><h3>Give the business network card a name</h3></label>\n                <input type="text" [ngModel]="cardName" id="cardName" name="cardName"\n                       (ngModelChange)="setCardName($event)"\n                       autocomplete="off" placeholder="e.g. {{newCard.getUserName() + \'@\' + newCard.getBusinessNetworkName()}}">\n                <div *ngIf="!cardNameValid" class="error-message">The card name must be unique</div>\n                <div class="actions">\n                  <button type="button" class="primary" (click)="addToWallet()" [disabled]="!cardNameValid">Add to wallet</button>\n                </div>\n            </ng-template>\n          </ngb-panel>\n          <ngb-panel id="option-2">\n              <ng-template ngbPanelTitle>\n                  <svg class="bx--accordion__arrow" width="12" height="12" viewBox="0 0 8 12" fill-rule="evenodd">\n                    <path d="M0 10.6L4.7 6 0 1.4 1.4 0l6.1 6-6.1 6z"></path>\n                  </svg>\n                  <span>Send it to someone else</span>\n                </ng-template>\n            <ng-template ngbPanelContent>\n                <p>Another Playground user can import the business network card to their wallet to start using the new identity</p>\n                <div class="actions">\n                  <button type="button" class="primary" (click)="export();">Export Business Network Card</button>\n                </div>\n            </ng-template>\n          </ngb-panel>\n        </ngb-accordion>\n    </div>\n  </div>\n  <footer>\n    <p class="footer-text">\n      <svg class="standard-icon" aria-hidden="true">\n        <use xlink:href="#icon-warn_32"></use>\n      </svg>\n      For security, new identities can only be enrolled once\n    </p>\n  </footer>\n</section>\n'},2629:function(e,t){e.exports='\x3c!--\n Licensed under the Apache License, Version 2.0 (the "License");\n you may not use this file except in compliance with the License.\n You may obtain a copy of the License at\n\n http://www.apache.org/licenses/LICENSE-2.0\n\n Unless required by applicable law or agreed to in writing, software\n distributed under the License is distributed on an "AS IS" BASIS,\n WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n See the License for the specific language governing permissions and\n limitations under the License.\n--\x3e\n<section class="main-view">\n    <div class="main-view-content">\n        <div class="flex" id="myIDs">\n            <div class="flex-container">\n                <h1 class="network-name" title="{{businessNetworkName}}">My IDs for {{businessNetworkName}}</h1>\n                <button id="issueID" type="button" class="secondary" (click)="issueNewId()">\n                    <span>Issue New ID</span>\n                </button>\n            </div>\n\n            <div class="identity-title">\n                <div class="selected-border"></div>\n                <div class="id">ID Name</div>\n                <div class="status">Status</div>\n            </div>\n            <div class="identity" *ngFor="let ID of myIDs" (dblclick)="setCurrentIdentity(ID, true)">\n                <div class="selected-border"\n                     [ngClass]="{\'selected-border--selected\': ID.ref === currentIdentity}"></div>\n                <div class="id">\n                    {{identityCards.get(ID.ref).getUserName()}}\n                </div>\n                <div class="flex" *ngIf="ID.ref===currentIdentity">\n                    In Use\n                </div>\n                <div class="flex" *ngIf="ID.ref!==currentIdentity && ID.usable ">\n                    <i>In my wallet</i>\n                </div>\n                <div class="flex" *ngIf="ID.ref!==currentIdentity && !ID.usable">\n                    <i>Bound participant not found</i>\n                </div>\n                <div class="actions" *ngIf="ID.ref!==currentIdentity">\n                    <button class="clear" *ngIf="ID.usable" (click)="setCurrentIdentity(ID, true)">Use now</button>\n                    <button class="clear" (click)="openRemoveModal(ID.ref); $event.stopPropagation()">Remove</button>\n                </div>\n            </div>\n        </div>\n        <div class="flex" id="allIDs">\n            <div class="flex-container">\n                <h1 class="network-name" title="{{businessNetworkName}}">All IDs for {{ businessNetworkName }}</h1>\n            </div>\n\n            <div class="identity-title">\n                <div class="selected-border"></div>\n                <div class="id cell-24">ID Name</div>\n                <div class="issued-to cell-24">Issued to</div>\n                <div class="status cell-24">Status</div>\n                <div class="actions cell-24"></div>\n            </div>\n            <div class="identity" *ngFor="let id of allIdentities">\n                <div class="selected-border"\n                     [ngClass]="{\'selected-border--selected\': id.ref === currentIdentity}"></div>\n                <div class="id cell-24">\n                    {{ id.name }}\n                </div>\n                <div class="issued-to cell-24">\n                    <span placement="top" container="body" ngbTooltip="{{ id.participant.$namespace }}.{{ id.participant.$type }}">{{ id.participant.$identifier }} ({{ id.participant.$type }})</span>\n                </div>\n                <div class="status cell-24">\n                    {{ id.state }}\n                </div>\n                <div class="cell-24">\n                    <div class="actions" *ngIf="id.ref !== currentIdentity && id.state!==\'REVOKED\'">\n                        <button class="clear" (click)="revokeIdentity(id)">Revoke</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <app-footer></app-footer>\n</section>\n'},2630:function(e,t){e.exports='\x3c!--\n Licensed under the Apache License, Version 2.0 (the "License");\n you may not use this file except in compliance with the License.\n You may obtain a copy of the License at\n\n http://www.apache.org/licenses/LICENSE-2.0\n\n Unless required by applicable law or agreed to in writing, software\n distributed under the License is distributed on an "AS IS" BASIS,\n WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n See the License for the specific language governing permissions and\n limitations under the License.\n--\x3e\n<section class="issue-identity">\n  <header class="modal-header">\n    <h1>Issue New Identity</h1>\n    <button class="icon modal-exit" (click)="activeModal.dismiss()">\n      <svg class="ibm-icon" aria-hidden="true">\n       <use xlink:href="#icon-close_new"></use>\n      </svg>\n    </button>\n  </header>\n  <section class="modal-body">\n    <p>Issue a new ID to a participant in your business network</p>\n\n    <ng-template #participantTypeaheadResult let-r="result" let-t="term">\n      <span class="participant-id">{{getParticipant(r).getIdentifier()}}</span> <span class="participant-type">{{getParticipant(r).getType()}}</span>\n    </ng-template>\n\n    <form #issueIdentityForm="ngForm" id="issue-identity-form" (ngSubmit)="issueIdentity()">\n\n      <div class="justified-input">\n        <label class="required" for="userID">ID Name<abbr title="required">*</abbr></label>\n        <input required type="text" [(ngModel)]="userID" id="userID" name="userID" autocomplete="off">\n      </div>\n\n      <div class="keyValue">\n        <label class="key" for="participantFQI">Participant<abbr title="required">*</abbr></label>\n        <div class="value">\n            <input [ngClass]="{\'error-underline\': !isParticipant}" required type="text" [(ngModel)]="participantFQI" id="participantFQI" name="participantFQI" [ngbTypeahead]="search" [resultTemplate]="participantTypeaheadResult" autocomplete="off" (ngModelChange)="isValidParticipant()">\n            <div *ngIf="!isParticipant" class="error-message" style="position: absolute; top: 165px;">\n                {{ noMatchingParticipant }}\n            </div>\n        </div>\n      </div>\n\n      <div>\n        <input type="checkbox" [(ngModel)]="issuer" id="issuer" name="issuer">\n        <label class="checkbox-label" for="issuer">Allow this ID to issue new IDs (\n          <svg class="standard-icon" aria-hidden="true">\n            <use xlink:href="#icon-relationship_16"></use>\n          </svg>\n          )\n        </label>\n      </div>\n    </form>\n\n    <p>Issuing an identity generates a one-time secret. You can choose to send this to somebody or use it yourself when it has been issued.</p>\n  </section>\n  <footer>\n    <button type="button" class="secondary" (click)="activeModal.dismiss();">\n      <span>Cancel</span>\n    </button>\n    <button id="createNew" type="submit" form="issue-identity-form" class="primary" [disabled]="!issueIdentityForm.form.valid || issueInProgress || !isParticipant">\n      <div *ngIf="!issueInProgress">\n        <span>Create New</span>\n      </div>\n      <div *ngIf="issueInProgress" class="ibm-spinner-indeterminate small loop">\n        <div class="loader">\n          <svg class="circular" viewBox="25 25 50 50">\n            <circle class="circle-path" cx="50" cy="50" r="20"/>\n          </svg>\n        </div>\n      </div>\n    </button>\n  </footer>\n</section>\n'},2631:function(e,t,n){var i=n(2625);"string"==typeof i&&(i=[[e.i,i,""]]);n(22)(i,{});i.locals&&(e.exports=i.locals)},2632:function(e,t,n){var i=n(2626);"string"==typeof i&&(i=[[e.i,i,""]]);n(22)(i,{});i.locals&&(e.exports=i.locals)},2633:function(e,t,n){var i=n(2627);"string"==typeof i&&(i=[[e.i,i,""]]);n(22)(i,{});i.locals&&(e.exports=i.locals)}});