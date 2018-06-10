select team_name, points from (
  select 'Blue Team' as team_name, nvl(sum(points),0) as points from jp_team_event_points ep, jp_team_events e where ep.event_id = e.event_id and to_char(e.awarded_date,'YYYY') = to_char(sysdate,'YYYY') and team_id = 1
  union all
  select 'Orange Team' as team_name, nvl(sum(points),0) as points from jp_team_event_points ep, jp_team_events e where ep.event_id = e.event_id and to_char(e.awarded_date,'YYYY') = to_char(sysdate,'YYYY') and team_id = 2
  union all
  select 'Silver Team' as team_name, nvl(sum(points),0) as points from jp_team_event_points ep, jp_team_events e where ep.event_id = e.event_id and to_char(e.awarded_date,'YYYY') = to_char(sysdate,'YYYY') and team_id = 3
)
