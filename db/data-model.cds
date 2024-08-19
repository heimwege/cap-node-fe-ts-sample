namespace cap.fe.ts.sample;

using {
  cuid,
  managed
} from '@sap/cds/common';

@title : '{i18n>sample}'
entity Samples : cuid, managed {
    name     : String(50) @title : '{i18n>name}';
    comments : composition of many Comments on comments.sample = $self;
}

entity Comments : cuid, managed {
    text                     : String;
    type                     : String;
    sample                   : association to Samples not null @Core.Immutable;
}