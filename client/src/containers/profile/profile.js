//react
import React, { Component } from "react";
//redux
import { connect } from 'react-redux'
//react router
import { Link } from 'react-router-dom';
//components
// import InfoTable from "../../components/info_table";
//actions
// import {actions as listActions} from '../../redux/';
//utils
import Utils from "../../utils/utils";

//const 

class template extends Component {

  constructor(props) {
    super(props);
    console.log("template constructor");
  }

  componentDidUpdate() {
  }

  // shouldComponentUpdate(nextProps,nextState){
    
  // }

  render() {
    const { detailData } = this.props;
    console.log("template render");

    return (
      <div class="notes_wrapper">
        <div class="aligner">

          <div class='user_banner'>
            <div class="profile_img_div">
              <img src="/users/{{ $id }}/avatar.png" alt="" srcset=""/>
            </div>
            <div class="user_buttons">
              {{ if eq $ses_id $id }}
                <a href="/create_post" class="pri_btn">New Post</a>
              {{ end }}
              {{ if ne $ses_id $id }}

                {{ if call .isF $ses_id $id }}
                  <a href="#" class="pri_btn unfollow" data-unfollow-to="{{ $id }}" >Unfollow</a>
                {{ end }}

                {{ if not (call .isF $ses_id $id) }}
                  <a href="#" class="pri_btn follow" data-follow-to="{{ $id }}" >Follow</a>
                {{ end }}

              {{ end }}
            </div>
            <div class="user_info">
              <a href="#" class="user_main_link">{{ $username }}</a>
              <span class="user_no_notes">{{ $email }}</span>
              <div class="user_bio {{ if not $bio }}no_bio{{ end }} ">
                <span>
                  {{ if $bio }} {{ $bio }} {{ end }}
                  {{ if not $bio }}
                    {{ if eq $ses_id $id }} You have no bio!! {{ end }}
                    {{ if ne $ses_id $id }} {{ $username }} has no bio!! {{ end }}
                  {{ end }}
                </span>
              </div>
              <hr />
              <div class="user_stats">
                <div class="stat_post">
                  <span class="stat_hg">{{ len $posts }}</span>
                  <span class="stat_nhg">Posts</span>
                </div>
                <a href="/followers/{{ $id }}" class="stat_followers">
                  <span class="stat_hg">{{ .followers }}</span>
                  <span class="stat_nhg" >Followers</span>
                </a>
                <a href="/followings/{{ $id }}" class="stat_followings">
                  <span class="stat_hg">{{ .followings }}</span>
                  <span class="stat_nhg">Followings</span>
                </a>
                <div class="stat_views stat_disabled">
                  <span class="stat_hg">{{ .views }}</span>
                  <span class="stat_nhg">Profile views</span>
                </div>
              </div>
            </div>
          </div>

          <div class="notes">

            {{ if $posts }}
              {{ template "post" . }}
            {{ end }}

            {{ if not $posts }}
              {{ template "nothing" .no_mssg }}
            {{ end }}

            {{ if $posts }}
              {{ template "end" }}
            {{ end }}

          </div>

        </div>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    // detailData:state.detailData[],
  }
}

const mapDispatchToProps = dispatch => ({
  // requestData: (index, scene, packageName) => dispatch(detailActions.requestData(index, scene, packageName, "inUse"))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(template);

