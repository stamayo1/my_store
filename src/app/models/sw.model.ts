interface CurrentVersion {
    hash: string;
    appData?: object;
}	
interface LatestVersion {
    hash: string;
    appData?: object;
}

export interface VersionReadyEvent {
    type: 'VERSION_READY'
    currentVersion: CurrentVersion
    latestVersion: LatestVersion
}
