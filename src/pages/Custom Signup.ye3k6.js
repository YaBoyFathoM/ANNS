import { authentication } from "wix-members-frontend";
$w.onReady(function () {
    $w('#loginbox').onMessage((event) => {
        let email = event.data.email;
        let password = event.data.password;
        authentication.login(email, password)
            .then(() => {
                $w('#lightbox1').collapse();
            })
            .catch(() => {
                authentication.register(email, password)
                    .then(() => {
                        $w('#lightbox1').collapse();
                        return authentication.login(email, password);
                    })
            })
    });
    $w('#googlebox').onMessage((event) => {
        let email = event.data.getEmail();
        let password = event.data.getId();
        authentication.login(email, password)
            .then(() => {
                $w('#lightbox1').collapse();
            })
            .catch(() => {
                authentication.register(email, password)
                    .then(() => {
                        $w('#lightbox1').collapse();
                        return authentication.login(email, password);
                    })
            })
    });
});