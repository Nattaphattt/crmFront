export interface IDataUpdatePoint {
    candidateId?: number | null;
    interview_id?: number | null;
    rating?: number | null;
    remark?: string | null;
    assessment: [
      {
        assess_id?: number | null;
        interview_id?: number | null;
        assessment_point?: number | null;
      }
    ];
  }