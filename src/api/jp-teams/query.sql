select team_name, points from (
  select 'Blue Team' as team_name, sum(points) as points from jp_team_event_points where team_id = 1
  union all
  select 'Orange Team' as team_name, sum(points) as points from jp_team_event_points where team_id = 2
  union all
  select 'Silver Team' as team_name, sum(points) as points from jp_team_event_points where team_id = 3
)
