import { App, Platform } from 'ionic-angular';
import { StatusBar, Globalization } from 'ionic-native';

@App({
    styles: [require('./<%=componentnameFile%>.component.scss').toString()],
    template: require('./<%=componentnameFile%>.component.html'),
    config: {
        // http://ionicframework.com/docs/v2/api/config/Config/
    },
    providers: []
})
export class <%=componentnameClass%>Component {

    constructor(platform: Platform) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Globalization.getPreferredLanguage().then(
                res => { },
                err => { }
            );
        });
    }
}