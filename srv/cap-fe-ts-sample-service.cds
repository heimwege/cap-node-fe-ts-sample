using cap.fe.ts.sample as smpl from '../db/data-model';

@path : 'CapFeTsSampleService'
service CapFeTsSampleService {

  @odata.draft.enabled
  @cds.search: {
    name,
    createdBy,
    modifiedBy
  }
  entity Samples as projection on smpl.Samples actions {
    action doSomething();
  };
}