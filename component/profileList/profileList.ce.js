import neoan from '{{base}}/asset/neoanJs/neoan.js';

const template = `
<ul class="list-group" data-for="profiles">
    <li class="list-group-item pointer" data-click="passOn($i)">
        <span>{{profile.name}}</span> |
        <span>{{profile.type}}</span> |
        <span>{{profile.language}}</span> </li>
</ul>
`;

neoan.component('profile-list', {
    data: {
        profiles: []
    },
    template: template,
    loaded() {
        neoan.services.api.get('profileList').then((data) => {
            this.data.profiles = data;
        });
    },
    passOn() {
        let obj = this.data.profiles[this.args];
        neoan.components.profile.forEach((entity) => {
            Object.keys(obj).forEach((key) => {
                entity.data[key] = obj[key];
            });
            entity.resetPicture();
        })
    }
});
