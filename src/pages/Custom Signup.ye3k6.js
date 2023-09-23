
import { authentication } from "wix-members-frontend";
$w.onReady(function () {
    $w('#loginbox').onMessage((event) => {
        let email = event.data.email;
        let password = event.data.password;
        authentication.login(email, password)
            .catch(() => {
                authentication.register(email, password)
                    .then(() => {
                        return authentication.login(email, password);
                    })
            })
    });
});
