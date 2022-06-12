<template>
    <v-container>
        <div style="height: 100vh">
        <RateComponent :solutionId="this.$route.params.id"/>
            <vue-jitsi-meet
                ref="jitsiRef"
                domain="meet.jit.si"
                :options="jitsiOptions"
            ></vue-jitsi-meet>
        </div>
    </v-container>
</template>

<script>
import { JitsiMeet } from "@mycure/vue-jitsi-meet";
import RateComponent from "@/components/Solution/RateComponent.vue";

export default {
    name: "SolutionAttemptPage",
    components: {
    VueJitsiMeet: JitsiMeet,
    RateComponent
},
    computed: {
        jitsiOptions() {
            return {
                roomName: this.$route.params.id,
                width: "100%",
                noSSL: false,
                userInfo: {
                    email: "user@email.com",
                    displayName: this.$store.getters.currentUser.name,
                },
                personID:'wedwds',
                configOverwrite: {
                    disableDeepLinking: true,
                    prejoinPageEnabled: false,
                    enableNoisyMicDetection: false,
                    screenshotCapture: {
                        enabled: true,
                        mode: "always",
                    },
                    fileRecordingsServiceEnabled: true,
                    localRecording: {
                        enabled: true,
                        format: "flac",
                    },
                    disableRemoteControl: true,
                    hideConferenceTimer: true,
                    remoteVideoMenu: {
                        disableKick: true,
                        disableGrantModerator: true,
                    },
                    subject: "Solving Issue Room",
                },
                interfaceConfigOverwrite: {
                    FILM_STRIP_MAX_HEIGHT: "0.1",
                    SHOW_JITSI_WATERMARK: false,
                    SHOW_WATERMARK_FOR_GUESTS: false,
                    SHOW_CHROME_EXTENSION_BANNER: false,
                    TOOLBAR_ALWAYS_VISIBLE: true,
                    TOOLBAR_BUTTONS: [
                        "microphone",
                        "camera",
                        "desktop",
                        "fullscreen",
                        "hangup",
                        "chat",
                        "settings",
                        // "tileview",
                    ],
                },
                onload: this.onIFrameLoad,
            };
        },
    },
    methods: {
        onIFrameLoad() {},
    },
};
</script>
