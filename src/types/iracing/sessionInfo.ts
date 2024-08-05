export interface ISessionInfo {
  timestamp: string;
  data: {
    WeekendInfo: {
      TrackName: string;
      TrackID: number;
      TrackLength: string;
      TrackLengthOfficial: string;
      TrackDisplayName: string;
      TrackDisplayShortName: string;
      TrackConfigName: string;
      TrackCity: string;
      TrackCountry: string;
      TrackAltitude: string;
      TrackLatitude: string;
      TrackLongitude: string;
      TrackNorthOffset: string;
      TrackNumTurns: number;
      TrackPitSpeedLimit: string;
      TrackType: string;
      TrackDirection: string;
      TrackWeatherType: string;
      TrackSkies: string;
      TrackSurfaceTemp: string;
      TrackAirTemp: string;
      TrackAirPressure: string;
      TrackWindVel: string;
      TrackWindDir: string;
      TrackRelativeHumidity: string;
      TrackFogLevel: string;
      TrackPrecipitation: string;
      TrackCleanup: number;
      TrackDynamicTrack: number;
      TrackVersion: string;
      SeriesID: number;
      SeasonID: number;
      SessionID: number;
      SubSessionID: number;
      LeagueID: number;
      Official: number;
      RaceWeek: number;
      EventType: string;
      Category: string;
      SimMode: string;
      TeamRacing: number;
      MinDrivers: number;
      MaxDrivers: number;
      DCRuleSet: string;
      QualifierMustStartRace: number;
      NumCarClasses: number;
      NumCarTypes: number;
      HeatRacing: number;
      BuildType: string;
      BuildTarget: string;
      BuildVersion: string;
      RaceFarm: any;
      WeekendOptions: {
        NumStarters: number;
        StartingGrid: string;
        QualifyScoring: string;
        CourseCautions: string;
        StandingStart: number;
        ShortParadeLap: number;
        Restarts: string;
        WeatherType: string;
        Skies: string;
        WindDirection: string;
        WindSpeed: string;
        WeatherTemp: string;
        RelativeHumidity: string;
        FogLevel: string;
        TimeOfDay: string;
        Date: string;
        EarthRotationSpeedupFactor: number;
        Unofficial: number;
        CommercialMode: string;
        NightMode: string;
        IsFixedSetup: number;
        StrictLapsChecking: string;
        HasOpenRegistration: number;
        HardcoreLevel: number;
        NumJokerLaps: number;
        IncidentLimit: string;
        FastRepairsLimit: string;
        GreenWhiteCheckeredLimit: number;
      };
      TelemetryOptions: {
        TelemetryDiskFile: string;
      };
    };
    SessionInfo: {
      Sessions: Array<{
        SessionNum: number;
        SessionLaps: string;
        SessionTime: string;
        SessionNumLapsToAvg: number;
        SessionType: string;
        SessionTrackRubberState: string;
        SessionName: string;
        SessionSubType: any;
        SessionSkipped: number;
        SessionRunGroupsUsed: number;
        SessionEnforceTireCompoundChange: number;
        ResultsPositions: any;
        ResultsFastestLap: Array<{
          CarIdx: number;
          FastestLap: number;
          FastestTime: number;
        }>;
        ResultsAverageLapTime: number;
        ResultsNumCautionFlags: number;
        ResultsNumCautionLaps: number;
        ResultsNumLeadChanges: number;
        ResultsLapsComplete: number;
        ResultsOfficial: number;
      }>;
    };
    CameraInfo: {
      Groups: Array<{
        GroupNum: number;
        GroupName: string;
        Cameras: Array<{
          CameraNum: number;
          CameraName: string;
        }>;
        IsScenic?: boolean;
      }>;
    };
    RadioInfo: {
      SelectedRadioNum: number;
      Radios: Array<{
        RadioNum: number;
        HopCount: number;
        NumFrequencies: number;
        TunedToFrequencyNum: number;
        ScanningIsOn: number;
        Frequencies: Array<{
          FrequencyNum: number;
          FrequencyName: string;
          Priority: number;
          CarIdx: number;
          EntryIdx: number;
          ClubID: number;
          CanScan: number;
          CanSquawk: number;
          Muted: number;
          IsMutable: number;
          IsDeletable: number;
        }>;
      }>;
    };
    DriverInfo: {
      DriverCarIdx: number;
      DriverUserID: number;
      PaceCarIdx: number;
      DriverHeadPosX: number;
      DriverHeadPosY: number;
      DriverHeadPosZ: number;
      DriverCarIsElectric: number;
      DriverCarIdleRPM: number;
      DriverCarRedLine: number;
      DriverCarEngCylinderCount: number;
      DriverCarFuelKgPerLtr: number;
      DriverCarFuelMaxLtr: number;
      DriverCarMaxFuelPct: number;
      DriverCarGearNumForward: number;
      DriverCarGearNeutral: number;
      DriverCarGearReverse: number;
      DriverCarSLFirstRPM: number;
      DriverCarSLShiftRPM: number;
      DriverCarSLLastRPM: number;
      DriverCarSLBlinkRPM: number;
      DriverCarVersion: string;
      DriverPitTrkPct: number;
      DriverCarEstLapTime: number;
      DriverSetupName: string;
      DriverSetupIsModified: number;
      DriverSetupLoadTypeName: string;
      DriverSetupPassedTech: number;
      DriverIncidentCount: number;
      Drivers: Array<{
        CarIdx: number;
        UserName: string;
        AbbrevName: any;
        Initials: any;
        UserID: number;
        TeamID: number;
        TeamName: string;
        CarNumber: string;
        CarNumberRaw: number;
        CarPath: string;
        CarClassID: number;
        CarID: number;
        CarIsPaceCar: number;
        CarIsAI: number;
        CarIsElectric: number;
        CarScreenName: string;
        CarScreenNameShort: string;
        CarClassShortName: any;
        CarClassRelSpeed: number;
        CarClassLicenseLevel: number;
        CarClassMaxFuelPct: string;
        CarClassWeightPenalty: string;
        CarClassPowerAdjust: string;
        CarClassDryTireSetLimit: string;
        CarClassColor: number;
        CarClassEstLapTime: number;
        IRating: number;
        LicLevel: number;
        LicSubLevel: number;
        LicString: string;
        LicColor: string;
        IsSpectator: number;
        CarDesignStr: string;
        HelmetDesignStr: string;
        SuitDesignStr: string;
        BodyType: number;
        FaceType: number;
        HelmetType: number;
        CarNumberDesignStr: string;
        CarSponsor_1: number;
        CarSponsor_2: number;
        CurDriverIncidentCount: number;
        TeamIncidentCount: number;
      }>;
    };
    SplitTimeInfo: {
      Sectors: Array<{
        SectorNum: number;
        SectorStartPct: number;
      }>;
    };
    CarSetup: {
      UpdateCount: number;
      TiresAero: {
        TireType: {
          TireType: string;
        };
        LeftFront: {
          StartingPressure: string;
          LastHotPressure: string;
          LastTempsOMI: string;
          TreadRemaining: string;
        };
        LeftRear: {
          StartingPressure: string;
          LastHotPressure: string;
          LastTempsOMI: string;
          TreadRemaining: string;
        };
        RightFront: {
          StartingPressure: string;
          LastHotPressure: string;
          LastTempsIMO: string;
          TreadRemaining: string;
        };
        RightRear: {
          StartingPressure: string;
          LastHotPressure: string;
          LastTempsIMO: string;
          TreadRemaining: string;
        };
        AeroBalanceCalc: {
          FrontRhAtSpeed: string;
          RearRhAtSpeed: string;
          RearWingAngle: string;
          FrontDownforce: string;
        };
      };
      Chassis: {
        FrontBrakes: {
          ArbBlades: number;
          TotalToeIn: string;
          BrakePedalRatio: number;
          BrakePads: string;
        };
        LeftFront: {
          CornerWeight: string;
          RideHeight: string;
          BumpRubberGap: string;
          SpringRate: string;
          Camber: string;
        };
        LeftRear: {
          CornerWeight: string;
          RideHeight: string;
          BumpRubberGap: string;
          SpringRate: string;
          Camber: string;
          ToeIn: string;
        };
        Rear: {
          FuelLevel: string;
          ArbBlades: number;
          RearWingAngle: string;
        };
        InCarAdjustments: {
          BrakePressureBias: string;
          AbsSetting: string;
          TractionControlSetting: string;
          DisplayPage: string;
          CrossWeight: string;
        };
        RightFront: {
          CornerWeight: string;
          RideHeight: string;
          BumpRubberGap: string;
          SpringRate: string;
          Camber: string;
        };
        RightRear: {
          CornerWeight: string;
          RideHeight: string;
          BumpRubberGap: string;
          SpringRate: string;
          Camber: string;
          ToeIn: string;
        };
        GearsDifferential: {
          GearStack: string;
          FrictionFaces: number;
          DiffPreload: string;
        };
      };
      Dampers: {
        FrontDampers: {
          LowSpeedCompressionDamping: string;
          HighSpeedCompressionDamping: string;
          LowSpeedReboundDamping: string;
          HighSpeedReboundDamping: string;
        };
        RearDampers: {
          LowSpeedCompressionDamping: string;
          HighSpeedCompressionDamping: string;
          LowSpeedReboundDamping: string;
          HighSpeedReboundDamping: string;
        };
      };
    };
  };
}
