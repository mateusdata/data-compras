
# Build para publicação
  eas build --platform android --profile production  execultar o build de produção
  eas submit -p android --profile production enviar para playstore (opcional)
  eas build --local --platform android --profile production  execultar o build de produção localmente



# comandos para build
Fazer build remoto expo: 
  eas build -p android --profile preview  => build expo generate apk for install

Download e install utimo build: 
  eas build:run -p android --latest  => baixar utim,o build android 

Fazer build localmente sem time: 
  eas build --local --platform android --profile preview

Fazer build localmente:
  time eas build --local --platform android --profile preview

#----------------------------------------------------------------------#

Fazer build local IOS build:
  time eas build --local --platform ios --profile preview 

Fazer build remoto IOS expo:
eas build -p ios --profile preview build ios no servidor expo 
eas build --platform ios
eas submit --platform ios


# MOSTRAR LISTA DE build ios
eas build:run -p ios     

#BAIXAR O UTIMO build ios
eas build:run -p ios --latest


#Config for build expo ios and android

* ios

{
  "build": {
    "preview": {
      "ios": {
        "simulator": true
      }
    },
    "production": {}
  }
}

* android

{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "preview2": {
      "android": {
        "gradleCommand": ":app:assembleRelease"
      }
    },
    "preview3": {
      "developmentClient": true
    },
    "preview4": {
      "distribution": "internal"
    },
    "production": {}
  }
}
